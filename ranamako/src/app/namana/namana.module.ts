import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NamanaRoutingModule } from './namana-routing.module';
import { BodyComponent } from './components/body/body.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { NamanaService } from './services/namana.service';


@NgModule({
  declarations: [
    BodyComponent,
    FormulaireComponent,
  ],
  imports: [
    CommonModule,
    NamanaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [
    NamanaService
  ]
})
export class NamanaModule { }
