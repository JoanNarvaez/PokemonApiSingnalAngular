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

@Component({
  selector: 'app-personaje',
  standalone: true,
  imports: [MaterialModule,MatDialogTitle, MatDialogContent,MatButtonModule],
  providers: [PokemonService],
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss']
})
export class PersonajeComponent implements OnInit {

  personaje: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pokeApi: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokeApi.getPokemon(this.data.Id).subscribe({
      next: respuesta => {
        this.personaje = respuesta;
      }
    });
  }
}
