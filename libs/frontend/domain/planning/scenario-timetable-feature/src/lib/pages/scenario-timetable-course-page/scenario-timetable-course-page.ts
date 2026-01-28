import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'lib-scenario-timetable-course-page',
  imports: [],
  templateUrl: './scenario-timetable-course-page.html',
  styleUrl: './scenario-timetable-course-page.scss',
})
export class ScenarioTimetableCoursePage {
  ar = inject(ActivatedRoute);
  ngOnInit(): void {
    console.log(this.ar.snapshot.params['scenarioId']);
  }
}
