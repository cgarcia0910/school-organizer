import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationHeader } from '../delivery/components/navigation-header/navigation-header';
import { BreadcrumsComponent } from '../delivery/components/breadcrums/breadcrums.component';

@Component({
  imports: [RouterModule, NavigationHeader, BreadcrumsComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss',
})
export class App {
  protected title = 'shell';
}
