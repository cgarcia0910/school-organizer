import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScenarioEntity } from '../entities/scenario.entity';
import { 
  Scenario,
  UpdateScenarioDto,
  CreateScenarioDto,
  PaginatedScenarioResponse,
} from '@organizer/generated-server-scenario';
import { ScenarioCourseEntity } from '../entities/scenario-course.entity';
import { ScenarioCourseGroupEntity } from '../entities/scenario-course-group.entity';
import { ScenarioCourseGroupSubjectTeacherEntity } from '../entities/scenario-course-group-subject-teacher';

@Injectable()
export class ScenarioService {
  constructor(
    @InjectRepository(ScenarioEntity)
    private scenarioRepository: Repository<ScenarioEntity>,
    @InjectRepository(ScenarioCourseEntity)
    private scenarioCourseRepository: Repository<ScenarioCourseEntity>,
    @InjectRepository(ScenarioCourseGroupEntity)
    private scenarioCourseGroupRepository: Repository<ScenarioCourseGroupEntity>,
    @InjectRepository(ScenarioCourseGroupSubjectTeacherEntity)
    private scenarioCourseGroupSubjectTeacherRepository: Repository<ScenarioCourseGroupSubjectTeacherEntity>,
  ) {}

  async scenarioGet(page: number, limit: number): Promise<PaginatedScenarioResponse> {
    const [scenarios, total] = await this.scenarioRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    });
  
    const data = await Promise.all(
      scenarios.map(scenario => this.entityToModel(scenario))
    );
  
    return {
      data,
      meta: {
        page: page,
        limit: limit,
        total: total,
      },
    };
  }

  scenarioIdDelete(id: number, request: Request): Promise<void> {
    return this.scenarioRepository.delete(id).then(() => {
      return;
    });
  }

  scenarioIdGet(id: number, request: Request): Promise<Scenario> {
    return this.scenarioRepository.findOne({ where: { id } }).then(scenario => {
      return this.entityToModel(scenario as ScenarioEntity);
    });
  }

  scenarioIdPut(id: number, updateScenarioDto: UpdateScenarioDto, request: Request): Promise<Scenario> {
    return this.scenarioRepository.update(id, updateScenarioDto).then(() => {
    return this.scenarioRepository.findOne({ where: { id } }).then(scenario => {
      return this.entityToModel(scenario as ScenarioEntity);
    });
  });
}

  async scenarioPost(createScenarioDto: CreateScenarioDto, request: Request): Promise<Scenario> {
    const scenario = await this.scenarioRepository.save({
      name: createScenarioDto.name,
    });
    const scenarioCourses = await Promise.all(JSON.parse(createScenarioDto.courses as unknown as string)?.map(async (course: any) => {
      return this.scenarioCourseRepository.save({
        scenario: { id: scenario.id },
        course: { id: course.courseId },
      });
    }));
    const scenarioCourseGroups = await Promise.all(
      JSON.parse(createScenarioDto.courses as unknown as string)?.flatMap(async (course: any, index: number) => {
        const savedScenarioCourse = scenarioCourses[index];
        // console.log({savedScenarioCourse});
        return Promise.all(course.groups?.map((group: any) => {
          return this.scenarioCourseGroupRepository.save({
            scenario: { id: savedScenarioCourse.scenario.id },
            course: { id: savedScenarioCourse.course.id },
            groupName: group.groupName,
          });
        }) || []);
      }) || []
    ).then(results => results.flat());
    const prueba = (JSON.parse(createScenarioDto.courses as unknown as string) || []).map((course: any) => 
      course.groups?.map((group: any) =>
        group.teacherAssignments?.map((teacherAssignment: any) => ({
          subject: {id: teacherAssignment.subjectId},
          // course: {id: course.courseId},
          scenarioCourseGroup: scenarioCourseGroups.find(scenario => scenario.course.id === course.courseId && scenario.groupName === group.groupName),
          // scenarioCourseGroup: scenarioCourseGroups.find(scenario => scenario)
          teacher: { id: teacherAssignment.teacherId}
        }))
      )
    )
    await Promise.all(prueba.flat(2).map((scgst: any) => this.scenarioCourseGroupSubjectTeacherRepository.save(scgst)))
    return this.entityToModel(scenario as ScenarioEntity);
  }


  private async entityToModel(entity: ScenarioEntity): Promise<Scenario> {
    const scenarioCourses = await this.scenarioCourseRepository.find({ where: { scenario: { id: entity.id } }, relations: ['course', 'scenario'] });
    const scenarioCourseGroups = await Promise.all(
      scenarioCourses.map(scenarioCourse => this.scenarioCourseGroupRepository.find({ where: { scenario: { id: scenarioCourse.scenario.id }, course: { id: scenarioCourse.course.id } }, relations: ['course', 'scenario'] }))
    );

    const courseGroupsSubjectTeachers = await Promise.all(
      scenarioCourseGroups.flatMap(courseGroup => 
        courseGroup.map(group => 
          this.scenarioCourseGroupSubjectTeacherRepository.find({ 
            where: { scenarioCourseGroup: { id: group.id } }, 
            relations: ['teacher', 'subject', 'scenarioCourseGroup']
          })
        )
      )
    );
    
    return {
      id: entity.id,
      name: entity.name,
      courses: await Promise.all(
        scenarioCourseGroups.map(async (scenarioCourse, index) => {
          const groupsWithAssignments = await Promise.all(
            scenarioCourse.map(async (group, groupIndex) => {
              // Calcular el índice correcto en el array aplanado
              const flatIndex = scenarioCourseGroups
                .slice(0, index)
                .reduce((acc, curr) => acc + curr.length, 0) + groupIndex;
              
              const assignments = await courseGroupsSubjectTeachers[flatIndex];
              
              return {
                id: group.id,
                groupName: group.groupName,
                teacherAssignments: assignments.map(assignment => ({
                  teacher: assignment.teacher,
                  subject: assignment.subject,
                })),
              };
            })
          );
      
          return {
            course: {
              id: scenarioCourse[0].course.id,
              name: scenarioCourse[0].course.name,
            },
            groups: groupsWithAssignments,
          };
        })
      ),
    };
  }
}