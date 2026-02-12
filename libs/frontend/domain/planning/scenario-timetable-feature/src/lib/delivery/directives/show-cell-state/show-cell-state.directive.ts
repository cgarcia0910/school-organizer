import { Directive, HostBinding, inject, Input } from '@angular/core';
import { Assignment, TimetableSelectionStore } from '../../../application/stores';

@Directive({
  selector: '[libShowCellState]',
  standalone: true
})
export class ShowCellStateDirective {
  @Input() libShowCellState?: Assignment;
  private readonly timetableSelectionStore = inject(TimetableSelectionStore);
  
  @HostBinding('class.selected-cell') get isSelected() {
    if (!this.libShowCellState) return false;
    return this.timetableSelectionStore.isCellSelected(this.libShowCellState);
  }

  @HostBinding('class.pinned-cell') get isPinned() {
    if (!this.libShowCellState) return false;
    return this.timetableSelectionStore.isCellPinned(this.libShowCellState);
  }
}
