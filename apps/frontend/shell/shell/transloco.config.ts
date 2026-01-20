import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { translocoConfig, TranslocoLoader } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    console.log('getTranslation', lang);
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

export const translocoConfiguration = {config: translocoConfig({
  availableLangs: ['es', 'en'],
  defaultLang: 'es',
  reRenderOnLangChange: true,
  prodMode: false
})
, loader: TranslocoHttpLoader};
