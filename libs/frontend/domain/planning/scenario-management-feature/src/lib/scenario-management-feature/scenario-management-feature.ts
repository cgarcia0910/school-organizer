import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScenarioDataSource } from '../datasources';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';
import { FormComponent, FormController } from '@organizer/devkit/forms';
import { AddScenarioFormController } from '../aplication';


@Component({
  selector: 'lib-scenario-management-feature',
  imports: [    
    MatTableModule,
    MatPaginatorModule,
    AsyncPipe,

    // Forms
    FormComponent,
  ],
  templateUrl: './scenario-management-feature.html',
  styleUrl: './scenario-management-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ScenarioDataSource, {provide: FormController, useClass: AddScenarioFormController}],
})
export class ScenarioManagementFeature {
  displayedColumns: string[] = ['name'];
  dataSource = inject(ScenarioDataSource);
}
