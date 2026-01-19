import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabilitationApi } from './habilitation-api';

describe('HabilitationApi', () => {
  let component: HabilitationApi;
  let fixture: ComponentFixture<HabilitationApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabilitationApi],
    }).compileComponents();

    fixture = TestBed.createComponent(HabilitationApi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
