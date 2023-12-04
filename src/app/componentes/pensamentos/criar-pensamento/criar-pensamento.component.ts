import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css'
})
export class CriarPensamentoComponent {

  formulario!: FormGroup;

  constructor(private service: PensamentoService, private router: Router, private formBuilder: FormBuilder ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\S)*\S(.|\s)*/)])],
      autoria: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      modelo: [''],
      favorito: [false]
    })
  }

  criarPensamento(){
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarpensamento'])
      })
    }
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
