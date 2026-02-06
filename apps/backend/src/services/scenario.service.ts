import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScenarioEntity } from '../entities/scenario.entity';
import {
  Scenario,
  UpdateScenarioDto,
  CreateScenarioDto,
  PaginatedScenarioResponse,
  Timetable,
} from '@organizer/generated-server-scenario';
import { ScenarioCourseEntity } from '../entities/scenario-course.entity';
import { ScenarioCourseGroupEntity } from '../entities/scenario-course-group.entity';
import { ScenarioCourseGroupSubjectTeacherEntity } from '../entities/scenario-course-group-subject-teacher';
import { HttpService } from '@nestjs/axios';
import { CourseSubjectEntity } from '../entities/course-subject.entity';
import { TimetableEntity } from '../entities/timetable.entity';

export enum ScenarioStatus {
  SOLUTION_PENDING = 'SOLUTION_PENDING',
  SOLUTION_READY = 'SOLUTION_READY',
  PUBLISHED = 'PUBLISHED',
}

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
    @InjectRepository(CourseSubjectEntity)
    private courseSubjectRepository: Repository<CourseSubjectEntity>,
    @InjectRepository(TimetableEntity)
    private timetableRepository: Repository<TimetableEntity>,
    @Inject(HttpService)
    private httpService: HttpService,
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
      status: ScenarioStatus.SOLUTION_PENDING,
    });
    const scenarioCourses = await Promise.all((createScenarioDto.courses as any)?.map(async (course: any) => {
      return this.scenarioCourseRepository.save({
        scenario: { id: scenario.id },
        course: { id: course.courseId },
      });
    }));
    const scenarioCourseGroups = await Promise.all(
      (createScenarioDto.courses as any)?.flatMap(async (course: any, index: number) => {
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
    const prueba = ((createScenarioDto.courses as any) || []).map((course: any) => 
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

    const courseSubjects = await this.courseSubjectRepository.find({ relations: ['course', 'subject'] });
    return {
      id: entity.id,
      name: entity.name,
      status: entity.status as Scenario.StatusEnum,
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
                  subject: {
                    ...assignment.subject,
                    hoursPerWeek: courseSubjects.find(courseSubject => courseSubject.subject.id === assignment.subject.id)?.hoursPerWeek || 0,
                    maxDailyWorkload: courseSubjects.find(courseSubject => courseSubject.subject.id === assignment.subject.id)?.maxDailyWorkload || 0,},
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

  async scenarioIdCalculateGet(id: number, request: Request): Promise<Timetable> {
    const scenarioInfo = await this.scenarioRepository.findOne({ where: { id } });
    const scenarioModel = await this.entityToModel(scenarioInfo as ScenarioEntity);
    const engineResponse = await this.httpService.post(`http://localhost:8000`, scenarioModel.courses).toPromise();
    await this.timetableRepository.delete({ scenario_id: id });
    await Promise.all(engineResponse?.data.map((entry: any) => 
      this.timetableRepository.save({
        scenario_id: id,
        course_id: entry.course_id,
        group_id: entry.group_id,
        day: entry.day,
        hour: entry.hour,
        subject: { id: entry.subject_id },
        teacher_id: entry.teacher_id,
      })))
    await this.scenarioRepository.update(id, { status: ScenarioStatus.SOLUTION_READY });
    const timetable = await this.timetableRepository.find({ where: { scenario_id: id } });
    return timetable
      .reduce((courses: any, assignment: any) => {
          const course = courses.find((course: any) => course.course_id === assignment.course_id && course.group_id === assignment.group_id)
          if(course) {
              course.assignments = [...course.assignments, assignment]
          } else {
              courses = [...courses, {course_id: assignment.course_id, group_id: assignment.group_id, assignments: [assignment]}]
          }
          return courses
      }, [])
      .map((course: any) => ({
            course_id: course.course_id,
          group_id: course.group_id,
          hours: course.assignments.reduce((hours: any, assignment: any) => {
              hours[assignment.hour] = [...(hours[assignment.hour] || []), assignment].sort((a,b) => a.day - b.day)
              return hours
          }, [])
      }))
  }
  

  async scenarioIdTimetableGet(id: number, request: Request): Promise<Timetable[]> {
    const timetable = await this.timetableRepository.find({ where: { scenario_id: id }, relations: ['subject'] });
    console.log(timetable);
    return timetable
      .reduce((courses: any, assignment: any) => {
          const course = courses.find((course: any) => course.course_id === assignment.course_id && course.group_id === assignment.group_id)
          if(course) {
              course.assignments = [...course.assignments, assignment]
          } else {
              courses = [...courses, {course_id: assignment.course_id, group_id: assignment.group_id, assignments: [assignment]}]
          }
          return courses
      }, [])
      .map((course: any) => ({
            course_id: course.course_id,
          group_id: course.group_id,
          hours: course.assignments.reduce((hours: any, assignment: any) => {
              hours[assignment.hour] = [...(hours[assignment.hour] || []), assignment].sort((a,b) => a.day - b.day)
              return hours
          }, [])
      }))
  }

}