import { TestBed } from '@angular/core/testing';
import { CourseDataSource } from './course.datasource';
import { firstValueFrom, of } from 'rxjs';
import { mockProvider } from '@ngneat/spectator/jest';
import { CourseService } from '@organizer/course-api';
import { CollectionViewer } from '@angular/cdk/collections';

describe('CourseDatasource', () => {
    let datasource: CourseDataSource;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CourseDataSource,
                mockProvider(CourseService, {
                    courseGet: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Course 1' }], meta: { total: 1 } }))
                }),
            ]
        });
        datasource = TestBed.inject(CourseDataSource);
    });
    it('should be created', () => {
        expect(datasource).toBeTruthy();
    });
    it('should get data when page changed', async () => {
        datasource.fetch(1);
        expect(await firstValueFrom(datasource.page$)).toEqual([{ id: 1, name: 'Course 1' }]);
    });

    it('shold get data when conect', async () => {
        datasource.fetch(0);
        datasource.refresh();
        expect(await firstValueFrom(datasource.connect({} as CollectionViewer))).toEqual([{ id: 1, name: 'Course 1' }]);

    })
})