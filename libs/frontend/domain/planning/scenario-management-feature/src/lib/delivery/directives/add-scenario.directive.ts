import { Directive, HostListener, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioDataSource } from '../../datasources';
import { AddUpdateScenarioDialogComponent } from '../components/add-update-scenario-dialog/add-update-scenario-dialog.component';

@Directive({
  selector: '[libAddScenario]',
})
export class AddScenarioDirective {
  private dialog = inject(MatDialog);
  private dataSource = inject(ScenarioDataSource);
  @HostListener('click')
  addCourse(): void {
    this.dialog.open(AddUpdateScenarioDialogComponent, {
      width: '1200px',
      maxWidth: '95vw',
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.dataSource.refresh();
      }
    });
  }
}
