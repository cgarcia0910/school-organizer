import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-scenario-timetable-feature',
  imports: [RouterOutlet],
  templateUrl: './scenario-timetable-feature.html',
  styleUrl: './scenario-timetable-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenarioTimetableFeature {}
