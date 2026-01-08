import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationHeader } from '../delivery/components/navigation-header/navigation-header';

@Component({
  imports: [RouterModule, NavigationHeader],
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss',
})
export class App {
  protected title = 'shell';
}
