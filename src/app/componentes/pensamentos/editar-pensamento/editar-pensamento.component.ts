import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pensamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css'
})
export class EditarPensamentoComponent {

  formulario!: FormGroup;

  constructor (private service: PensamentoService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([Validators.required, Validators.pattern(/(.|\S)*\S(.|\s)*/)])],
        autoria: [pensamento.autoria , Validators.compose([Validators.required, Validators.minLength(3)])],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito]
      })
    })
  }

  editarPensamento(){
    this.service.editar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarpensamento'])
    })
  }

  cancelar(){
    this.router.navigate(['/listarpensamento'])
  }

  hablitarBotao(): string {
    if(this.formulario.valid){
      return 'botao'
    }else{
      return 'botao__desabilitado'
    }
  }
}
