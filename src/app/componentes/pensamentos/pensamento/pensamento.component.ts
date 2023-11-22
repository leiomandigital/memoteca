import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pensamento } from '../pensamento';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pensamento',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})
export class PensamentoComponent {

 @Input() pensamento: Pensamento ={
    id: 0,
    conteudo: 'I love angular',
    autoria: 'Leioman',
    modelo: 'modelo3'
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

}
