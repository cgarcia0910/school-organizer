import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-config-option-selector',
  imports: [MatIconModule, RouterLink],
  templateUrl: './config-option-selector.component.html',
  styleUrl: './config-option-selector.component.scss',
})
export class ConfigOptionSelectorComponent {}
