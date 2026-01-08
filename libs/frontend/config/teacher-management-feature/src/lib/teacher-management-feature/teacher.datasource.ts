import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Teacher, TeacherService } from "@organizer/teacher-api";
import { map, Observable, switchMap, tap, BehaviorSubject, Subject } from "rxjs";

export class TeacherDataSource extends DataSource<any> {
    private pageNumber = new BehaviorSubject<number>(1);
    page$: Observable<Teacher[]>;
    total$: Subject<number> = new Subject<number>();
    override connect(collectionViewer: CollectionViewer): Observable<readonly Teacher[]> {
        console.log('TeacherDataSource connect');
        return this.page$.pipe(
            tap(page => console.log('TeacherDataSource connect', page)),
        );
    }
    override disconnect(collectionViewer: CollectionViewer): void {}
    constructor(private teacherService: TeacherService) {
        super();
        console.log('TeacherDataSource constructor');
        this.page$ = this.pageNumber.pipe(
            switchMap(page => this.teacherService.teacherGet(page, 2)),
            tap(page => this.total$.next(page.meta.total)),
            map(page => page.data)
        );
    }
    fetch(page: number): void {
        console.log('TeacherDataSource fetch', page);
        this.pageNumber.next(page+1);
    }

}