import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { HttpClientModule } from '@angular/common/http';
import { BotaoCarregarMaisComponent } from './botao-carregar-mais/botao-carregar-mais.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-pensamento',
  standalone: true,
  imports: [CommonModule, RouterLink, PensamentoComponent, HttpClientModule, BotaoCarregarMaisComponent, FormsModule],
  templateUrl: './listar-pensamento.component.html',
  styleUrl: './listar-pensamento.component.css'
})
export class ListarPensamentoComponent {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private service: PensamentoService, private router: Router) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length){
        this.haMaisPensamentos = false;
      }
    })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {this.listaPensamentos = listaPensamentos})
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos,
      this.listaFavoritos = listaPensamentosFavoritos
    })
  }

  recarregarComponentes(){
    this.paginaAtual = 1
    this.favoritos = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }
}
