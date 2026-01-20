import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { map, Observable, switchMap, tap, BehaviorSubject, Subject, combineLatest } from "rxjs";
import { Injectable } from "@angular/core";
import { Course, CourseService } from "@organizer/course-api";

@Injectable()
export class CourseDataSource extends DataSource<Course> {
    private pageNumber = new BehaviorSubject<number>(1);
    page$: Observable<Course[]>;
    total$: Subject<number> = new Subject<number>();
    private refresh$ = new BehaviorSubject<Boolean>(true);
    override connect(collectionViewer: CollectionViewer): Observable<readonly Course[]> {
        return this.page$
    }
    override disconnect(collectionViewer: CollectionViewer): void {}
    constructor(private courseService: CourseService) {
        super();
        this.page$ = combineLatest({page: this.pageNumber, refresh: this.refresh$}).pipe(
            switchMap(({page}) => this.courseService.courseGet(page, 5)),
            tap(response => this.total$.next(response.meta.total)),
            map(response => response.data)
        );
    }
    fetch(page: number): void {
        this.pageNumber.next(page+1);
    }
    refresh(): void {
        this.refresh$.next(true);
    }
}