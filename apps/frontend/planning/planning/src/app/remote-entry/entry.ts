import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-planning-entry',
  template: `<h2>Planning</h2><router-outlet></router-outlet>`,
  standalone: true,
})
export class RemoteEntry {}
