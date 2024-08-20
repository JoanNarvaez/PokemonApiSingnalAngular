import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    // MatDialogModule,
    HttpClientModule,
    // BrowserModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  exports:[
    // CommonModule,
    // MatCardModule, 
    // MatButtonModule,
    // MatListModule,
    // MatProgressSpinnerModule,
    // MatDialogModule,
    // BrowserModule, MatSnackBarModule
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    // MatDialogModule,
    HttpClientModule,
    // BrowserModule,
    MatSnackBarModule,
    MatIconModule,
  ]
})
export class MaterialModule { }