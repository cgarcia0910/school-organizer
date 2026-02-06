import { Directive, HostListener, inject, Input } from '@angular/core';
import { Scenario, ScenarioService } from "@organizer/scenario-api";
@Directive({
  selector: '[libCalculateScenario]',
})
export class CalculateScenarioDirective {
  @Input() libCalculateScenario!: Scenario;
  private readonly scenarioService = inject(ScenarioService);
  @HostListener('click') calculateScenario() {
    this.scenarioService.scenarioIdCalculateGet(this.libCalculateScenario.id).subscribe((response) => {
      console.log('response', response);
    });
  }
}
