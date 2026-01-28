import { Component, inject } from '@angular/core';
import { SubjectDataSource } from './application';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@ngneat/transloco';
import { AddSubjectDirective } from './delivery/directives/add-subject.directive';
import { UpdateSubjectDirective } from './delivery/directives/update-subject.directive';
import { DeleteSubjectDirective } from './delivery/directives/delete-subject.directive';

@Component({
  selector: 'lib-subject-management-feature',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    AddSubjectDirective,
    UpdateSubjectDirective,
    DeleteSubjectDirective,
    TranslocoPipe,
  ],
  templateUrl: './subject-management-feature.html',
  styleUrl: './subject-management-feature.scss',
  providers: [SubjectDataSource]
})
export class SubjectManagementFeature {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = inject(SubjectDataSource);
}
