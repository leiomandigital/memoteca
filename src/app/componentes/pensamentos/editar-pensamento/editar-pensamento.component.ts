import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pensamento } from '../pensamento';
import { FormsModule } from '@angular/forms';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pensamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css'
})
export class EditarPensamentoComponent {

  pensamento: Pensamento ={
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor (private service: PensamentoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento
    })
  }

  editarPensamento(){
    if(this.pensamento.id){
      this.service.editar(this.pensamento).subscribe(() => {
        this.router.navigate(['/listarpensamento'])
      })
    }
  }

  cancelar(){
    this.router.navigate(['/listarpensamento'])
  }

}
