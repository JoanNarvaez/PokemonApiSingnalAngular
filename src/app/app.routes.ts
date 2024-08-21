import { Routes } from '@angular/router';
import PokeApiComponent from './poke-api/poke-api.component';

export const routes: Routes = [{
    path: 'poke-api-signal',
    // loadComponent: () =>
    //     import('./poke-api/poke-api.component')
    component:PokeApiComponent
}];
