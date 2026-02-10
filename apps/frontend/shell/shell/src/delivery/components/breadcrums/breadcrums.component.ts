import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { ScenarioService } from '@organizer/scenario-api';

@Component({
  selector: 'app-breadcrums',
  imports: [RouterLink, AsyncPipe, JsonPipe, TranslocoPipe],
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly scenarioService = inject(ScenarioService);
  public readonly breadcrumbs$ =  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    switchMap((crumbs) => {
      let crumbsString = this.router.url.split('/')
        .filter(s => s)
        .map(s => `breadcrumbs.${s}`)
        .join('/');
      // console.log({crumbsString});
      // add all translation prefix
      console.log({crumbsString});
      const scenarioId = crumbsString.match(/\/breadcrumbs\.scenario\/breadcrumbs\.(\d+)\/breadcrumbs\.course/)?.[1];
      console.log(scenarioId);
      if(scenarioId) {
        return this.scenarioService.scenarioIdGet(Number(scenarioId)).pipe(
          map((scenario) => {
            console.log(scenario);
            crumbsString = crumbsString.replace(`breadcrumbs.scenario/breadcrumbs.${scenarioId}`, scenario.name);
            return crumbsString.split('/').filter(s => s);
            // console.log({crumbsString});
          }));
      }
      console.log({crumbsString});
      return of(crumbsString.split('/').filter(s => s));
      // return JSON.parse(crumbsString);
    }),
  )

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        let route = this.activatedRoute;
        
        // Navegar hasta la ruta más profunda
        while (route.firstChild) {
          route = route.firstChild;
        }
        
        // Obtener todos los datos
        console.log('=== Información de Ruta ===');
        console.log('URL completa:', this.router.url);
        console.log('Segmentos:', this.router.url.split('/').filter(s => s));
        console.log('Params:', route.snapshot.params);
        console.log('Query Params:', route.snapshot.queryParams);
        console.log('Fragment:', route.snapshot.fragment);
        console.log('Data:', route.snapshot.data);
        
        // Recorrer toda la jerarquía de rutas
        let currentRoute = this.activatedRoute;
        let allParams = {};
        while (currentRoute) {
          allParams = { ...allParams, ...currentRoute.snapshot.params };
          currentRoute = currentRoute.firstChild!;
        }
        console.log('Todos los params de la jerarquía:', allParams);
      });
    }
}
