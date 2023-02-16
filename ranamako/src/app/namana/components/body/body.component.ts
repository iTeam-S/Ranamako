import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { MessagesModel } from '../../models/namana.model';
import { NamanaService } from '../../services/namana.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  intervalLoader!: NodeJS.Timer;
  intervalTextTyper!: NodeJS.Timer;
  imagesPath!: string;
  messages!: MessagesModel[];

  constructor(
    private namanaService: NamanaService
  ) { }

  ngOnInit(): void {
    this.messages = [];
    this.imagesPath = 'assets/images';
  }

  private loader(element: HTMLElement): void {
    element.textContent = '';
    this.intervalLoader = setInterval(() => {
      element.textContent += '.';
      element.textContent === '....' && (element.textContent = '');
    }, 301);
  }

  private typeText(element: HTMLElement, text: string): void {
    let index = 0;
     this.intervalTextTyper = setInterval(() => {
      if(index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else clearInterval(this.intervalTextTyper);
    }, 19);
  }

  private generateUniqueId() {
    const timestamp = Date.now();
    const hexastring = Math.random().toString(16);
    return `id_${timestamp}_${hexastring}`;
  }

  private addMessageUser(textRequest: string): void {
    const donnees: MessagesModel = {
      ia: false,
      texte: textRequest
    };
    this.messages.push(donnees);
  }

  private createMessage(element: HTMLElement, response: string, status: boolean): void {
    clearInterval(this.intervalLoader);
    element.innerHTML = '';
    if(status) this.typeText(element, response);
    else {
        element.style.color = '#e74343';
      element.innerHTML = response;
    }
  }

  private awaitMessageIa(textRequest: string): void {
    const generatedId = this.generateUniqueId();
    const donnees: MessagesModel = {
      ia: true,
      texte: '',
      uniqueId: generatedId
    };
    this.messages.push(donnees);

    let messageElt: HTMLElement = <HTMLElement>document.getElementById(generatedId);
    let intervalElt = setInterval(() => {
      messageElt = <HTMLElement>document.getElementById(generatedId);
      if(messageElt) {
        clearInterval(intervalElt);
        const chatIa = <HTMLElement>document.getElementById(`chat_${generatedId}`);
        chatIa.classList.add('loader_position');
        this.loader(messageElt);
        this.namanaService.requestResponse(textRequest).pipe(
          tap(response => {
            chatIa.classList.remove('loader_position');
            this.createMessage(messageElt, response, true);
          })
        ).subscribe({
          error: response => {
            chatIa.classList.remove('loader_position');
            this.createMessage(messageElt, response.message, false);
          }
        });
      };
    }, 100);
  }

  onListenTextRequest(textRequest: string) {
    this.addMessageUser(textRequest);
    this.awaitMessageIa(textRequest);    
  }
}
