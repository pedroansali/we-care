import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Parse from 'parse';
import { ToastrService  } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss', '../../../styles.scss']
})
export class CadastroComponent {
  selectedFunction: string;

  cadastroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required]],
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
    window.localStorage.clear()
    if (this.cadastroForm.valid) {
      const dadosFormulario = this.cadastroForm.value;
      // Agora você pode usar os dados do formulário, por exemplo:
      console.log('Dados do formulário:', dadosFormulario);

      if (this.selectedFunction =='paciente'){
          (async () => {
            const user: Parse.User = new Parse.User();
            user.set('nome', dadosFormulario.nome);
            user.set('username', dadosFormulario.usuario);
            user.set('email', dadosFormulario.email);
            user.set('password', dadosFormulario.senha);
            user.set('cpf', dadosFormulario.cpf);
            user.set('crp', dadosFormulario.crp);
            user.set('cidade', dadosFormulario.cidade);
            user.set('estado', dadosFormulario.estado);
            user.set('telefone', dadosFormulario.telefone);
            user.set('role', this.selectedFunction);
          
            try {
              let userResult: Parse.User = await user.signUp();
              console.log('Nome do usuário: ', userResult.get('usuario'));
              console.log('Email do usuário: ', userResult.get('email'));
              console.log('Usuário Criado!', userResult);
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
          const user: Parse.User = new Parse.User();
          user.set('nome', dadosFormulario.nome);
          user.set('username', dadosFormulario.usuario);
          user.set('email', dadosFormulario.email);
          user.set('password', dadosFormulario.senha);
          user.set('cpf', dadosFormulario.cpf);
          user.set('crp', dadosFormulario.crp);
          user.set('cidade', dadosFormulario.cidade);
          user.set('estado', dadosFormulario.estado);
          user.set('telefone', dadosFormulario.telefone);
          user.set('role', this.selectedFunction);
        
          try {
            let userResult: Parse.User = await user.signUp();
            console.log('Nome do usuário: ', userResult.get('usuario'));
            console.log('Email do usuário: ', userResult.get('email'));
            console.log('Usuário Criado!', userResult);
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
