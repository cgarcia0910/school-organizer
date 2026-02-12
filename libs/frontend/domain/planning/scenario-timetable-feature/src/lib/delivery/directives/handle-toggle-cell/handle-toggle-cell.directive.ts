import { Directive, HostListener, inject, Input } from '@angular/core';
import { Assignment, TimetableSelectionStore } from '../../../application/stores';

@Directive({
  selector: '[libHandleToggleCell]',
  standalone: true
})
export class HandleToggleCellDirective {
  @Input() libHandleToggleCell?: Assignment;
  private readonly timetableSelectionStore = inject(TimetableSelectionStore);
  
  @HostListener('click')
  onClick() {
    if (!this.libHandleToggleCell) return;
    this.timetableSelectionStore.toggleCell(this.libHandleToggleCell);
  }
}
