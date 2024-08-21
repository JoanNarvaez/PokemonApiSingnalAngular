import { Routes } from '@angular/router';
import PokeApiComponent from './poke-api/poke-api.component';

export const routes: Routes = [{
    path: 'a',
    // loadComponent: () =>
    //     import('./poke-api/poke-api.component')
    component:PokeApiComponent
}];
