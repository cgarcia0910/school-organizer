import { Component, HostListener, ViewChild } from "@angular/core";
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { NgFor } from "@angular/common";
interface Item {
  id: number;
  title: string;
  image: string;
}
@Component({
    selector: 'infinite-scroll',
    styleUrl: './infinite-scroll.component.scss',
    imports: [ScrollingModule, NgFor],
    template: `<cdk-virtual-scroll-viewport
  class="viewport"
  [itemSize]="rowHeight"
  (scrolledIndexChange)="onScroll($event)"
>
  <div
    class="row"
    *cdkVirtualFor="let row of rows"
    [style.gridTemplateColumns]="'repeat(' + columns + ', 200px)'"
  >
    <div class="card" *ngFor="let item of row; trackBy: trackById">
      <img [src]="item.image" loading="lazy" alt="" />
      <div class="title">
        {{ item.title }}
      </div>
    </div>
  </div>
</cdk-virtual-scroll-viewport>`
})
export class infiniteScrollComponent {
  items: Item[] = [];
  rows: Item[][] = [];

  page = 0;
  pageSize = 40;
  loading = false;

  cardWidth = 200;
  gap = 14;
  rowHeight = this.cardWidth + this.gap;

  columns = 1;

  ngOnInit() {
    this.calculateColumns();
    this.loadMore();
  }
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;

  ngAfterViewInit() {
    this.calculateColumns();       // cálculo real usando ancho del viewport
    this.groupRows();
    this.viewport?.checkViewportSize();
  }

  @HostListener('window:resize')
  onResize() {
    const prev = this.columns;
    this.calculateColumns();
    if (this.columns !== prev) {
      this.groupRows();
      this.viewport?.checkViewportSize();
    }
  }

  calculateColumns() {
    const containerWidth = window.innerWidth - 32;
    this.columns = Math.max(
      1,
      Math.floor(containerWidth / (this.cardWidth + this.gap))
    );
  }

  loadMore() {
    console.log('loadMore');
    if (this.loading) return;

    this.loading = true;

    // Simulación backend
    setTimeout(() => {
      const newItems: Item[] = Array.from(
        { length: this.pageSize },
        (_, i) => ({
          id: this.page * this.pageSize + i,
          title: 'Item ' + (this.page * this.pageSize + i),
          image: `https://picsum.photos/300/200?random=${Math.random()}`
        })
      );

      this.items = [...this.items, ...newItems];
      this.groupRows();
      this.page++;
      this.loading = false;

    }, 500);
  }

  groupRows() {
    this.rows = [];

    for (let i = 0; i < this.items.length; i += this.columns) {
      this.rows.push(this.items.slice(i, i + this.columns));
    }
  }

  onScroll(index: number) {
    console.log('onScroll', index);
    if (!this.viewport || this.loading) return;
  
    const visibleRows = Math.ceil(this.viewport.getViewportSize() / this.rowHeight);
  
    // cuando estoy a unas filas del final, cargo más
    if (index + visibleRows + 1 >= this.rows.length) {
      this.loadMore();
    }
  }

  trackById(index: number, item: Item) {
    return item.id;
  }

}