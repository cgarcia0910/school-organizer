import { Component } from '@angular/core';
import { SidebarMenu } from '../../delivery/components/sidebar-menu/sidebar-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [SidebarMenu, RouterOutlet],
  selector: 'app-config-entry',
  template: `<app-sidebar-menu></app-sidebar-menu><router-outlet></router-outlet>`,
  standalone: true,
  styles: [ `
    :host {
      display: flex;
      gap: 1rem;
    }
  ` ]
})
export class RemoteEntry {}
