import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { GroupService } from '@organizer/prueba-api';
import { MATERIAL_IMPORTS } from '@organizer/ui-material';

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterModule, ...MATERIAL_IMPORTS],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenu {
  // private groupService = inject(GroupService);
  // ngOnInit() {
  //   this.groupService.groupGet(1, 10).subscribe(response => {
  //     console.log(response);
  //   });
  // }
}
