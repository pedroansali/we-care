import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as Parse from 'parse';


@Component({
  selector: 'app-disponibiliza-sessao',
  templateUrl: './disponibiliza-sessao.component.html',
  styleUrls: ['./disponibiliza-sessao.component.scss']
})
export class DisponibilizaSessaoComponent implements OnInit{
  nomeUsuario: string;
  roleUsuario: string;
  idUsuario: string;
  addSessaoForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, private toastr: ToastrService){
      //form da sessao
      this.addSessaoForm = this.formBuilder.group({
        dataSessao: ['', Validators.nullValidator],
        valor: ['', Validators.required],
        
        // Outros campos e validações aqui
      });
    //dados do usuario q vem da home
    this.nomeUsuario = data.nomeUsuario;
    this.roleUsuario = data.roleUsuario;
    this.idUsuario = data.idUsuario[0].objectId;
    //.log(this.idUsuario);
  }
  //funcao pra add sessao no banco
  addSessao(){
    if (this.addSessaoForm.valid) {
      const dadosSessao = this.addSessaoForm.value;
      const currentUser = Parse.User.current().toPointer();
      console.log(currentUser);
      // Agora você pode usar os dados do formulário, por exemplo:
      console.log('Dados do formulário:', dadosSessao);
    (async () => {
      const novaSessao: Parse.Object = new Parse.Object('Session');
      novaSessao.set('data', new Date(dadosSessao.dataSessao));
      //novaSessao.set('hora', 1);
      novaSessao.set('valor', dadosSessao.valor);
      //novaSessao.set('agendada', true);
      novaSessao.set('idPsicologo', currentUser);
      try {
        const result: Parse.Object = await novaSessao.save();
        // Access the Parse Object attributes using the .GET method
        console.log('Sessão criada e disponibilizada', result);
      } catch (error: any) {
        console.error('Erro ao criar sessão: ', error);
      }
    })();
    }
  }

  ngOnInit(): void {
    
  }
}
