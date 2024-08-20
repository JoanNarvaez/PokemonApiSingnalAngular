import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { PokemonService } from '../services/pokemon.service';
import { MaterialModule } from '../material/material.module';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personaje',
  standalone: true,
  imports: [MaterialModule,MatDialogTitle, MatDialogContent,MatButtonModule],
  providers: [PokemonService],
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss']
})
export class PersonajeComponent implements OnInit {

  pokemon: any;
  animationArray: string[] = [];
  indiceActual: number = 0;
  animating: boolean = false;
  private animationInterval: any; // Intervalo de animación

  constructor(
    private pokemonService: PokemonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemon(this.data.id).subscribe({
      next: (response: any) => {
        this.pokemon = response;

        // Configurar animaciones si están disponibles
        if (response.sprites && response.sprites.front_default && response.sprites.back_default) {
          this.animationArray = [
            response.sprites.front_default,
            response.sprites.back_default
          ];
          this.iniciarAnimacion(); // Iniciar animación si hay imágenes
        } else {
          this.animationArray = [];
        }
      },
      error: (err: any) => {
        console.error('Error al obtener Pokémon:', err);
        this.openSnackBarError();
        this.animationArray = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.detenerAnimacion();
  }

  playSound(soundSource: string) {
    if (soundSource) {
      const audio = new Audio(soundSource);
      audio.play().catch(err => console.error('Error al reproducir el sonido:', err));
    }
  }

  openSnackBarError() {
    this._snackBar.open('Nombre o id de pokemon no válido', 'Cerrar', { duration: 3000 });
  }

  iniciarAnimacion() {
    this.indiceActual = 0;
    this.animating = true;
    this.animateFrames();
  }

  animateFrames() {
    if (this.animating) {
      this.animationInterval = setInterval(() => {
        this.indiceActual = (this.indiceActual + 1) % this.animationArray.length;
      }, 300);
    }
  }

  detenerAnimacion() {
    this.animating = false;
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }
}