import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'poke-api-signal',
    loadComponent: () =>
        import('./poke-api/poke-api.component')
}];
