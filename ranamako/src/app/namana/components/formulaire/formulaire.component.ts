import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  @Output() textRequest = new EventEmitter<string>();
  requestForm!: FormControl;

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.requestForm = this.formbuilder.control('', Validators.required);
  }

  onSend(): void {
    const donnees = this.requestForm.value as string;
    if(!donnees) return;
    this.textRequest.emit(donnees);
  }
}
