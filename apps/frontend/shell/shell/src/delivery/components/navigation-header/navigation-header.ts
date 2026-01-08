import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '@organizer/ui-material';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-header',
  imports: [RouterModule, ...MATERIAL_IMPORTS],
  templateUrl: './navigation-header.html',
  styleUrl: './navigation-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NavigationHeader {

}
