import { Component } from '@angular/core';
import { SidebarMenu } from '../../delivery/components/sidebar-menu/sidebar-menu';
import { RouterOutlet } from '@angular/router';
import { infiniteScrollComponent } from '@organizer/devkit/forms';

@Component({
  imports: [SidebarMenu, RouterOutlet, infiniteScrollComponent],
  selector: 'app-config-entry',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  styles: []
})
export class RemoteEntry {
  
}
