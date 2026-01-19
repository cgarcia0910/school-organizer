import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Subject as SubjectModel, SubjectService } from "@organizer/subject-api";
import { map, Observable, switchMap, tap, BehaviorSubject, Subject, combineLatest } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SubjectDataSource extends DataSource<any> {
    private pageNumber = new BehaviorSubject<number>(1);
    page$: Observable<SubjectModel[]>;
    total$: Subject<number> = new Subject<number>();
    private refresh$ = new BehaviorSubject<Boolean>(true);
    override connect(collectionViewer: CollectionViewer): Observable<readonly SubjectModel[]> {
        return this.page$
    }
    override disconnect(collectionViewer: CollectionViewer): void {}
    constructor(private subjectService: SubjectService) {
        super();
        this.page$ = combineLatest({page: this.pageNumber, refresh: this.refresh$}).pipe(
            switchMap(({page}) => this.subjectService.subjectGet(page, 5)),
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