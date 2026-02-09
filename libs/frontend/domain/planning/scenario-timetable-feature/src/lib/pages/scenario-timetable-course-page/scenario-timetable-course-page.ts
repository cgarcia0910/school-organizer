import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Course, ScenarioCourseGroup, ScenarioService, TimetableDayEntry } from '@organizer/scenario-api';
import { TimetableDataSource } from '../../application/datasources/timetable.datasource';
import { MatTableModule } from '@angular/material/table';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'lib-scenario-timetable-course-page',
  imports: [MatTableModule, TranslocoPipe],
  templateUrl: './scenario-timetable-course-page.html',
  styleUrl: './scenario-timetable-course-page.scss',
})
export class ScenarioTimetableCoursePage {
  private scenarioService = inject(ScenarioService);
  ar = inject(ActivatedRoute);
  timetableDataSources: Array<{
    datasource: TimetableDataSource
    displayedColumns: string[]
    course: Course
    group: ScenarioCourseGroup
  }> = [];
  ngOnInit(): void {
    console.log(this.ar.snapshot.params['scenarioId']);
    this.scenarioService.scenarioIdTimetableGet(this.ar.snapshot.params['scenarioId']).subscribe((timetable) => {
      console.log(timetable);
      this.timetableDataSources = timetable.map((tt) => ({
        datasource: new TimetableDataSource(new BehaviorSubject<readonly Array<TimetableDayEntry>[]>(tt.hours)),
        course: tt.course as Course,
        group: tt.group as ScenarioCourseGroup,
        displayedColumns: tt.hours[0].map((day: any) => `day-${day.day}`),
      }))
  })
  }
}
