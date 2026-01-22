import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterControl } from './filter-control';

describe('FilterControl', () => {
  let component: FilterControl;
  let fixture: ComponentFixture<FilterControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterControl],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
