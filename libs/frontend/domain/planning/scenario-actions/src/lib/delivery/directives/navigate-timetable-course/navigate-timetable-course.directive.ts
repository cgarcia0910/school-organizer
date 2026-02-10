import { Directive, HostListener, inject, Input } from '@angular/core';
import { Scenario } from '@organizer/scenario-api';
import { Router } from '@angular/router';

@Directive({
  selector: '[libNavigateTimetableCourse]',
})
export class NavigateTimetableCourseDirective {
  private readonly router = inject(Router);
  @Input() libNavigateTimetableCourse!: Scenario;
  @HostListener('click') navigateTimetableCourse() {
    console.log('navigateTimetableCourse', this.libNavigateTimetableCourse);
    this.router.navigate(['/planning/scenario', this.libNavigateTimetableCourse.id, 'course']);
  }
}
