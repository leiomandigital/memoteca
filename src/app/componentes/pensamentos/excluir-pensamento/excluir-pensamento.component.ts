import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excluir-pensamento.component.html',
  styleUrl: './excluir-pensamento.component.css'
})
export class ExcluirPensamentoComponent {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  constructor(private service: PensamentoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento
    })
  }

  excluirPensamento(){
    if(this.pensamento.id){
      this.service.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listarpensamento'])
      })
    }
  }

  cancelar(){
    this.router.navigate(['/listarpensamento'])
  }

}
