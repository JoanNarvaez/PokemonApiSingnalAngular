import { Routes } from '@angular/router';
import PokeApiComponent from './poke-api/poke-api.component';

export const routes: Routes = [{
    path: "pokemon",
    loadComponent: () =>
        import('./poke-api/poke-api.component')
    // component:PokeApiComponent
}];
