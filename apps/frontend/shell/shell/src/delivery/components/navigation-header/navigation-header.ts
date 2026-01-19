import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '@organizer/ui-material';
import { RouterModule } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navigation-header',
  imports: [RouterModule, ...MATERIAL_IMPORTS, TranslocoPipe],
  templateUrl: './navigation-header.html',
  styleUrl: './navigation-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NavigationHeader {
  private readonly translocoService = inject(TranslocoService);
  changeLanguage() {
    this.translocoService.setActiveLang(this.translocoService.getActiveLang() === 'es' ? 'en' : 'es');
  }
  getLanguageIcon() {
    return this.translocoService.getActiveLang() === 'es' ? 'es' : 'en';
  }
}
