import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
        import('./poke-api/poke-api.component')
}];
