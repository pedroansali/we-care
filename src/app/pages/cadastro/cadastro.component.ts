import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Parse from 'parse';
import { ToastrService  } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  selectedFunction: string;

  cadastroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      crp: ['', [Validators.nullValidator]],
      cidade: ['', [Validators.nullValidator]],
      estado: ['', [Validators.nullValidator]],
      telefone: ['', [Validators.nullValidator]],
      // Outros campos e validações aqui
    });
  }

  selectFunction(functionName: string) {
    this.selectedFunction = functionName;
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      const dadosFormulario = this.cadastroForm.value;
      // Agora você pode usar os dados do formulário, por exemplo:
      console.log('Dados do formulário:', dadosFormulario);

      if (this.selectedFunction =='paciente'){
        (async () => {
          const novoPaciente: Parse.Object = new Parse.Object('Paciente');
          novoPaciente.set('nome', dadosFormulario.nome);
          novoPaciente.set('email', dadosFormulario.email);
          novoPaciente.set('senha', dadosFormulario.senha);
          novoPaciente.set('cpf', dadosFormulario.cpf);
          novoPaciente.set('cidade', dadosFormulario.cidade);
          novoPaciente.set('estado', dadosFormulario.estado);
          novoPaciente.set('telefone', dadosFormulario.telefone);
          try {
            const result: Parse.Object = await novoPaciente.save();
            // Access the Parse Object attributes using the .GET method
            console.log('Nome do usuário: ', result.get('nome'));
            console.log('Email do usuário: ', result.get('email'));
            console.log('Usuário Criado!', result);
            this.toastr.success('Usuário cadastrado com sucesso!');
            this.router.navigate(['']);
          } catch (error: any) {
            console.error('Erro ao criar novo usuário: ', error);
            this.toastr.error('Erro ao cadastrar usuário!');
          }
        })();
      }
      if (this.selectedFunction =='psicologo'){
        (async () => {
          const novoPsicologo: Parse.Object = new Parse.Object('Profissional');
          novoPsicologo.set('nome', dadosFormulario.nome);
          novoPsicologo.set('email', dadosFormulario.email);
          novoPsicologo.set('senha', dadosFormulario.senha);
          novoPsicologo.set('cpf', dadosFormulario.cpf);
          novoPsicologo.set('crp', dadosFormulario.crp);
          novoPsicologo.set('cidade', dadosFormulario.cidade);
          novoPsicologo.set('estado', dadosFormulario.estado);
          novoPsicologo.set('telefone', dadosFormulario.telefone);
          try {
            const result: Parse.Object = await novoPsicologo.save();
            // Access the Parse Object attributes using the .GET method
            console.log('Nome do usuário: ', result.get('nome'));
            console.log('Email do usuário: ', result.get('email'));
            console.log('Usuário Criado!', result);
            this.toastr.success('Usuário cadastrado com sucesso!');
            this.router.navigate(['']);
          } catch (error: any) {
            console.error('Erro ao criar novo usuário: ', error);
            this.toastr.error('Erro ao cadastrar usuário!');
          }
        })();
      }
      // Faça aqui sua lógica de cadastro usando os dados do formulário
      /*user.cadastrar().then(function(user) {
        console.log('User created successful with name: ' + user.get("nome") + ' and email: ' + user.get("email"));
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });*/
    }
  }

  
}
