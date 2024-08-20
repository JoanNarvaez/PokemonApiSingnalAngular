
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PersonajeComponent } from '../personaje/personaje.component';
import { MatDialog} from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-poke-api',
  standalone: true,
  imports: [
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    
  ],
  providers: [PokemonService],
  templateUrl: './poke-api.component.html',
  styleUrl: './poke-api.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokeApiComponent implements OnInit {
  personaje: any = {}

  pokemonNameOrId = signal('');
  loading = signal(false);
  pokemons = signal<any[]>([]);  // Lista de Pokémon que se va a mostrar
  animationArray = signal<string[]>([]);
  indiceActual = signal(0);
  animating = signal(false);
  contador = signal<number[]>([]);

 


  // imagenActual = computed(() => {
  //   const array = this.animationArray();
  //   return array.length > 0 ? array[this.indiceActual()] : '';
  // });


  constructor(
    private pokeApi: PokemonService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

 ngOnInit(): void {
    this.pokeApi.obtenerPersonajes().subscribe({
     next: (data: any) => {
       this.personaje = data;
       console.log(this.personaje)
     },
     error: (err: any) => {
       console.log(err);
     }
    })
   }



  // ngOnDestroy(): void {
  //   this.detenerAnimacion();
  // }

  playSound(soundSource: string) {
    const audio = new Audio(soundSource);
    audio.play().catch(err => console.error('Error al reproducir el sonido:', err));
  }

  loadPokemon() {
    const count = 20; // Valor fijo para la cantidad de Pokémon

    // this.detenerAnimacion();
    this.loading.set(true);
    this.pokemons.set([]);


    const requests = Array.from({ length: count }, () => this.pokeApi.getPokemon(this.generateRandomPokemonId().toString()));

    forkJoin(requests)
      .subscribe(
        responses => {
          this.pokemons.set(responses);
          this.loading.set(false);
        },
        err => {
          console.log(err);
          // this.openSnackBarError();
          this.loading.set(false);
        }
      );
  }


  generateRandomPokemonId(): number {
    return Math.floor(Math.random() * 649) + 1; // Asumiendo que hay 898 Pokémon
  }

  // openSnackBarError() {
  //   this._snackBar.open('Error al cargar los Pokémon. Inténtalo de nuevo.', 'Cerrar', { duration: 3000 });
  // }

  // openSnackSinData() {
  //   this._snackBar.open('Escriba una cantidad válida para cargar Pokémon', 'Cerrar', { duration: 3000 });
  // }

  // iniciarAnimacion() {
  //   this.indiceActual.set(0);
  //   this.animating.set(true);
  //   this.animateFrames();
  // }

  // animateFrames() {
  //   setTimeout(() => {
  //     if (this.animating()) {
  //       this.indiceActual.update(index => (index + 1) % this.animationArray().length);
  //       this.animateFrames();
  //     }
  //   }, 300);
  // }

  // detenerAnimacion() {
  //   this.animating.set(false);
  // }

  // updateName(name: string) {
  //   this.pokemonNameOrId.set(name.toLowerCase());
  // }

  openDialog(id: number) {
    this.dialog.open(PersonajeComponent, {
      data: { id },
      // width: '600px'
    });
  }

  playSoundOnClick() {
    this.pokemons().forEach(pokemon => {
      if (pokemon.cries?.latest) {
        this.playSound(pokemon.cries.latest);
      }
    });
  }
  isLast(item: any, list: any[]): boolean {
    return list[list.length - 1] === item;
  }

 


}

