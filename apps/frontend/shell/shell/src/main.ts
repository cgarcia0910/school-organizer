import { setRemoteDefinitions } from '@nx/angular/mf';
import { loadRemoteDefinitions } from '@nx/angular/mf';

loadRemoteDefinitions('/assets/module-federation.manifest.json')
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));

/*fetch('/assets/module-federation.manifest.json')
  .then(res => res.json())
  .then(definitions => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap'))
  .catch(err => console.error(err));*/
