import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  @Output() textRequest = new EventEmitter<string>();
  requestCtrl!: FormControl;

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.requestCtrl = this.formbuilder.control('', Validators.required);
  }

  onSend(): void {
    const donnees = this.requestCtrl.value as string;
    if(!donnees) return;
    this.textRequest.emit(donnees);    
    this.requestCtrl.reset();
  }
}
