import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScenarioDataSource } from '../datasources';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormComponent, FormController } from '@organizer/devkit/forms';
import { AddScenarioFormController } from '../aplication';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddScenarioDirective } from '../delivery/directives/add-scenario.directive';
import { TranslocoPipe } from '@ngneat/transloco';
import { CalculateScenarioDirective, NavigateTimetableCourseDirective } from '@school-organizer/planning/scenario-actions';


@Component({
  selector: 'lib-scenario-management-feature',
  imports: [    
    MatTableModule,
    MatPaginatorModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    AddScenarioDirective,
    TranslocoPipe,
    JsonPipe,
    CalculateScenarioDirective,
    NavigateTimetableCourseDirective,
  ],
  templateUrl: './scenario-management-feature.html',
  styleUrl: './scenario-management-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ScenarioDataSource, {provide: FormController, useClass: AddScenarioFormController}],
})
export class ScenarioManagementFeature {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = inject(ScenarioDataSource);
}
