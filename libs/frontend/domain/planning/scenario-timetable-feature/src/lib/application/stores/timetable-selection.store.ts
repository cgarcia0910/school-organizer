import { Injectable } from "@angular/core";

export interface Assignment {
    id: number;
    day: number;
    hour: number;
    course_id: number;
    group_id: number;
    scenario_id: number;
    course: {id: number, name: string};
    subject: {id: number, name: string};
    teacher: {id: number, name: string};
}

export interface TimetableSelection {
    selectedAssignments: Assignment[];
    pinnedAssignments: Assignment[];
    selectedCourse: number | undefined;
    selectedGroup: number | undefined;
}

@Injectable( { providedIn: 'root' } )
export class TimetableSelectionStore {
    private state: TimetableSelection = {
        selectedAssignments: [],
        pinnedAssignments: [],
        selectedCourse: undefined,
        selectedGroup: undefined,
    };
    
  toggleCell(assignment: Assignment | undefined) {
    if (!assignment) return;
    
    // check if the assignment belongs to the selected course
    if (assignment.course.id !== this.state.selectedCourse || assignment.group_id !== this.state.selectedGroup) {
        this.state.selectedCourse = assignment.course.id;
        this.state.selectedGroup = assignment.group_id;
        this.state.selectedAssignments = []
    }
    if (this.isCellSelected(assignment)) {
        this.state.selectedAssignments = this.state.selectedAssignments.filter(a => a.id !== assignment.id);
    } else {
        this.state.selectedAssignments.push(assignment);
    }
  }
  
  isCellSelected(assignment: Assignment | undefined): boolean {
    if (!assignment) return false;
    return this.state.selectedAssignments.some(a => a.id === assignment.id);
  }

  isCellPinned(assignment: Assignment | undefined): boolean {
    if (!assignment) return false;
    return this.state.pinnedAssignments.some(a => a.id === assignment.id);
  }

  pinSelectedCells() {
    this.state.pinnedAssignments = [...this.state.pinnedAssignments, ...this.state.selectedAssignments];
    this.state.selectedAssignments = [];
  }
}