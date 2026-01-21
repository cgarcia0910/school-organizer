import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScenarioDataSource } from '../datasources';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-scenario-management-feature',
  imports: [    
    MatTableModule,
    MatPaginatorModule,
    AsyncPipe,
  ],
  templateUrl: './scenario-management-feature.html',
  styleUrl: './scenario-management-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ScenarioDataSource],
})
export class ScenarioManagementFeature {
  displayedColumns: string[] = ['name'];
  dataSource = inject(ScenarioDataSource);
}
