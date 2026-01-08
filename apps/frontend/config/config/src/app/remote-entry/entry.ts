import { Component } from '@angular/core';
import { SidebarMenu } from '../../delivery/components/sidebar-menu/sidebar-menu';

@Component({
  imports: [SidebarMenu],
  selector: 'app-config-entry',
  template: `<app-sidebar-menu></app-sidebar-menu>`,
  standalone: true,
})
export class RemoteEntry {}
