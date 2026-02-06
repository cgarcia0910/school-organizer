import { Component } from '@angular/core';
import { SidebarMenu } from '../../delivery/components/sidebar-menu/sidebar-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [SidebarMenu, RouterOutlet],
  selector: 'app-config-entry',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  styles: []
})
export class RemoteEntry {
  
}
