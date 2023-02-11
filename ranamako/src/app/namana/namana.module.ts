import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NamanaRoutingModule } from './namana-routing.module';
import { BodyComponent } from './components/body/body.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { MessageComponent } from './components/message/message.component';
import { NamanaService } from './services/namana.service';


@NgModule({
  declarations: [
    BodyComponent,
    FormulaireComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    NamanaRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    NamanaService
  ]
})
export class NamanaModule { }
