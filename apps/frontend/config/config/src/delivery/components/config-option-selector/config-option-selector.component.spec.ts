import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigOptionSelectorComponent } from './config-option-selector.component';

describe('ConfigOptionSelectorComponent', () => {
  let component: ConfigOptionSelectorComponent;
  let fixture: ComponentFixture<ConfigOptionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigOptionSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigOptionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
