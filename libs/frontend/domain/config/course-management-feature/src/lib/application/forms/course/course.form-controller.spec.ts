import { TestBed } from '@angular/core/testing';
import { CourseService } from '@organizer/course-api';
import { CourseFormController } from './course.form-controller';
import { mockProvider } from '@ngneat/spectator/jest';
import { MatDialogRef } from '@angular/material/dialog';
import { AddUpdateCourseDialog } from '../../../delivery/components';
import { SubjectService } from '@organizer/subject-api';
import { FormControl } from '@angular/forms';
import { FormSelectType } from '@organizer/devkit/forms';
import { firstValueFrom } from 'rxjs';

describe('CourseFormController', () => {
  let controller: CourseFormController;
  let service: CourseService;
  let subjectService: SubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseFormController,
        mockProvider(CourseService, {}),
        mockProvider(MatDialogRef<AddUpdateCourseDialog>, {
          close: jest.fn()
        }),
        mockProvider(SubjectService, {
          subjectGet: jest.fn().mockReturnValue(Promise.resolve({
            data: [
              { id: 1, name: 'Mathematics' },
              { id: 2, name: 'Science' }
            ]
          }))
        })
      ],
    });
    controller = TestBed.inject(CourseFormController);
    service = TestBed.inject(CourseService);
    subjectService = TestBed.inject(SubjectService);
  });

  it('should be created', () => {
    expect(controller).toBeTruthy();
  });

  it('should get fields with correct structure', () => {
    const fields = controller.getFields();
    
    // Verificar que es un array con 2 elementos
    expect(Array.isArray(fields)).toBe(true);
    expect(fields.length).toBe(2);
    
    // Verificar el campo 'name'
    expect(fields[0].key).toBe('name');
    expect(fields[0].label).toBe('Names');
    expect(fields[0].type).toBe('text');
    expect(fields[0].required).toBe(true);
    expect(fields[0].formControl).toBeInstanceOf(FormControl);
    
    // Verificar el campo 'subjects'
    expect(fields[1].key).toBe('subjects');
    expect(fields[1].label).toBe('Subjects');
    expect(fields[1].type).toBe('array');
    expect(fields[1].required).toBe(true);
    expect(fields[1].formControl).toBeInstanceOf(FormControl);
    expect(fields[1].children).toBeDefined();
    expect(fields[1].children?.length).toBe(3);
    
    // Verificar los children del campo 'subjects'
    const children = fields[1].children!;
    
    // Child 1: subject
    expect(children[0].key).toBe('subject');
    expect(children[0].label).toBe('Subject');
    expect(children[0].type).toBe('select');
    expect(children[0].required).toBe(true);
    expect(children[0].formControl).toBeInstanceOf(FormControl);
    
    // Child 2: hoursPerWeek
    expect(children[1].key).toBe('hoursPerWeek');
    expect(children[1].label).toBe('Hours per week');
    expect(children[1].type).toBe('number');
    expect(children[1].required).toBe(true);
    expect(children[1].formControl).toBeInstanceOf(FormControl);
    
    // Child 3: maxDailyWorkload
    expect(children[2].key).toBe('maxDailyWorkload');
    expect(children[2].label).toBe('Max daily workload');
    expect(children[2].type).toBe('number');
    expect(children[2].required).toBe(true);
    expect(children[2].formControl).toBeInstanceOf(FormControl);
  });


  it('should call subjectGet on initialization', () => {
    expect(subjectService.subjectGet).toHaveBeenCalledWith(1, 100);
  });

  it('should have form getter that returns a FormGroup', () => {
    const form = controller.form;
    expect(form).toBeDefined();
    expect(form.get('name')).toBeDefined();
    expect(form.get('subjects')).toBeDefined();
  });

  it('should have getModel method that returns empty object', () => {
    const model = controller['getModel']();
    expect(model).toEqual({});
  });

  it('should return proper subjects array', async () => {
    const subjects = await firstValueFrom((controller.getFields()[1].children![0] as FormSelectType).options);
    expect(subjects).toEqual([
      { value: 1, label: 'Mathematics' },
      { value: 2, label: 'Science' }
    ]);
  });
});