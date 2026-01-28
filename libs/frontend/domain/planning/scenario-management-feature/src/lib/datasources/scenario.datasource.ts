import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Scenario, ScenarioService } from "@organizer/scenario-api";
import { map, Observable, switchMap, tap, BehaviorSubject, Subject, combineLatest } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ScenarioDataSource extends DataSource<any> {
    private pageNumber = new BehaviorSubject<number>(1);
    page$: Observable<Scenario[]>;
    total$: Subject<number> = new Subject<number>();
    private refresh$ = new BehaviorSubject<Boolean>(true);
    override connect(collectionViewer: CollectionViewer): Observable<readonly Scenario[]> {
        return this.page$
    }
    override disconnect(collectionViewer: CollectionViewer): void {}
    constructor(private scenarioService: ScenarioService) {
        super();
        this.page$ = combineLatest({page: this.pageNumber, refresh: this.refresh$}).pipe(
            switchMap(({page}) => this.scenarioService.scenarioGet(page, 5)),
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