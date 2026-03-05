import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { infiniteScrollComponent } from '@organizer/devkit/forms';

@Component({
  selector: 'app-config-option-selector',
  imports: [MatIconModule, RouterLink, infiniteScrollComponent],
  templateUrl: './config-option-selector.component.html',
  styleUrl: './config-option-selector.component.scss',
})
export class ConfigOptionSelectorComponent {}
