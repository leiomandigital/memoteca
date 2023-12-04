import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pensamento } from '../pensamento';
import { RouterLink } from '@angular/router';
import { PensamentoService } from '../pensamento.service';

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
    modelo: 'modelo3',
    favorito: false
  }

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(private service: PensamentoService) {}

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  favorito(): string {
    if(this.pensamento.favorito == false){
      return 'inativo'
    }
    return 'ativo'
  }

  atualizarFavorito(){
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
    });
  }

}
