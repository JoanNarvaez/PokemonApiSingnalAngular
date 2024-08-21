
// import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
// import { PokemonService } from '../services/pokemon.service';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { forkJoin } from 'rxjs';
// import { FormsModule } from '@angular/forms';
// import { PersonajeComponent } from '../personaje/personaje.component';
// import { MatDialog} from '@angular/material/dialog';
// import { MaterialModule } from '../material/material.module';


// @Component({
//   selector: 'app-poke-api',
//   standalone: true,
//   imports: [
//     HttpClientModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     CommonModule,
//     FormsModule,
//     // MaterialModule
    
//   ],
//   providers: [PokemonService],
//   templateUrl: './poke-api.component.html',
//   styleUrls: ['./poke-api.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export default class PokeApiComponent implements OnDestroy {
//   pokemonNameOrId = signal('');
//   loading = signal(false);
//   pokemons = signal<any[]>([]);  // Lista de Pokémon que se va a mostrar
//   animationArray = signal<string[]>([]);
//   indiceActual = signal(0);
//   animating = signal(false);
//   contador = signal<number[]>([]);


//   imagenActual = computed(() => {
//     const array = this.animationArray();
//     return array.length > 0 ? array[this.indiceActual()] : '';
//   });


//   constructor(
//     private dialog: MatDialog,
//     private pokemonService: PokemonService,
//     private _snackBar: MatSnackBar
//   ) { }



//   ngOnDestroy(): void {
//     this.detenerAnimacion();
//   }

//   playSound(soundSource: string) {
//     const audio = new Audio();
//     audio.src = soundSource;
//     audio.load();
//     audio.play();
//   }
//   loadPokemon() {
//     const count = 20; // Valor fijo para la cantidad de Pokémon

//      this.detenerAnimacion();
//     this.loading.set(true);
//     this.pokemons.set([]);


//     const requests = Array.from({ length: count }, () => this.pokemonService.getPokemon(this.generateRandomPokemonId().toString()));

//     forkJoin(requests).subscribe({
//       next: (pokemons: any[]) => {
//         this.pokemons.set(pokemons);
//         this.loading.set(false);
  
//         // Aplicar animaciones y sonidos para todos los Pokémon
//         if (pokemons.length > 0) {
//           // Mostrar animaciones para todos los Pokémon
//           // Puedes personalizar esto según el número de Pokémon y el tipo de animación que quieras aplicar
//           const animationArray = pokemons.map(pokemon => [
//             pokemon.sprites.front_default,
//             pokemon.sprites.back_default
//           ]);
  
//           this.animationArray.set(animationArray.flat()); // Aplanar el array de arrays
//           this.iniciarAnimacion();
          
//           // Reproducir sonidos para todos los Pokémon
//           pokemons.forEach(pokemon => {
//             this.playSound(pokemon.cries.latest);
//           });
//         }
  
//       },
//       error: (err: any) => {
//         console.log(err);
//         this.openSnackBarError();
//         this.loading.set(false);
//         // Aquí podrías agregar alguna lógica de animación en caso de error si es necesario
//       }
//     });
//   }


//   generateRandomPokemonId(): number {
//     return Math.floor(Math.random() * 649) + 1; // Asumiendo que hay 898 Pokémon
//   }

//   openSnackBarError() {
//     this._snackBar.open('Error al cargar los Pokémon. Inténtalo de nuevo.', 'Cerrar', { duration: 3000 });
//   }

//   openSnackSinData() {
//     this._snackBar.open('Escriba una cantidad válida para cargar Pokémon', 'Cerrar', { duration: 3000 });
//   }

//   iniciarAnimacion() {
//     this.indiceActual.set(0);
//     this.animating.set(true);
//     this.animateFrames();
//   }

//   animateFrames() {
//     setTimeout(() => {
//       if (this.animating()) {
//         this.indiceActual.update(index => (index + 1) % this.animationArray().length);
//         this.animateFrames();
//       }
//     }, 300);
//   }

//   detenerAnimacion() {
//     this.animating.set(false);
//   }

//   updateName(name: string) {
//     this.pokemonNameOrId.set(name.toLowerCase());
//   }

 

//   playSoundOnClick() {
//     this.pokemons().forEach(pokemon => {
//       if (pokemon.cries?.latest) {
//         this.playSound(pokemon.cries.latest);
//       }
//     });
//   }

//   openDialog(id: any) {
//     this.dialog.open(PersonajeComponent, {
//       data: { id },
//       // width: '600px'
//     });
//   }


//   isLast(item: any, list: any[]): boolean {
//     return list[list.length - 1] === item;
//   }


//   trackByFn(index: number, item: any): number {
//     return item.id;
//   }

 
// }
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { PersonajeComponent } from '../personaje/personaje.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-poke-api',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers: [PokemonService],
  templateUrl: './poke-api.component.html',
  styleUrls: ['./poke-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokeApiComponent implements OnDestroy {
  pokemons = signal<any[]>([]);
  animationArray = signal<string[]>([]);
  indiceActual = signal(0);
  animating = signal(false);
  loading = signal(false);

  imagenActual = computed(() => {
    const array = this.animationArray();
    return array.length > 0 ? array[this.indiceActual()] : '';
  });

  constructor(
    private dialog: MatDialog,
    private pokemonService: PokemonService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.detenerAnimacion();
  }

  loadPokemon() {
    const count = 20;
    this.detenerAnimacion();
    this.pokemons.set([]);
    this.animationArray.set([]);

    const requests = Array.from({ length: count }, () => this.pokemonService.getPokemon(this.generateRandomPokemonId().toString()));

    forkJoin(requests).subscribe({
      next: (pokemons: any[]) => {
        this.pokemons.set(pokemons);
        this.loading.set(false);

        if (pokemons.length > 0) {
          const animationArray = pokemons.map(pokemon => [
            pokemon.sprites.front_default,
            pokemon.sprites.back_default
          ]);
          this.animationArray.set(animationArray.flat());
          this.iniciarAnimacion();
        }
      },
      error: (err: any) => {
        console.log(err);
        this.openSnackBarError();
        this.loading.set(false);
      }
    });
  }

  generateRandomPokemonId(): number {
    return Math.floor(Math.random() * 649) + 1;
  }

  openSnackBarError() {
    this._snackBar.open('Error al cargar los Pokémon. Inténtalo de nuevo.', 'Cerrar', { duration: 3000 });
  }

  iniciarAnimacion() {
    this.indiceActual.set(0);
    this.animating.set(true);
    this.animateFrames();
  }

  animateFrames() {
    setTimeout(() => {
      if (this.animating()) {
        this.indiceActual.update(index => (index + 1) % this.animationArray().length);
        this.animateFrames();
      }
    }, 300);
  }

  detenerAnimacion() {
    this.animating.set(false);
  }

  playSound(soundSource: string) {
    if (soundSource) {
      const audio = new Audio(soundSource);
      audio.play().catch(err => console.error('Error al reproducir el sonido:', err));
    }
  }

  
  openDialog(id: any) {
    this.dialog.open(PersonajeComponent, {
      data: { id },
    });
  }
}