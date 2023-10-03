import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Parse from 'parse';
import {MatDialog} from '@angular/material/dialog';
import { DisponibilizaSessaoComponent } from '../../components/disponibiliza-sessao/disponibiliza-sessao.component'
import { CriarAgendamentoComponent } from 'src/app/components/criar-agendamento/criar-agendamento.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  usuario: string;
  senha: string;
  nomeUsuario: string;
  idUsuario: string;
  roleUsuario: string;
  modal: any;
  
  ngOnInit() {
    const currentUser = Parse.User.current();
    //console.log(currentUser.role)
    // Dado do usuário que vem do login
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.senha = params['senha'];
    });
    (async () => {
      (async () => {
        try {
          let user: Parse.User = await Parse.User.logIn(this.usuario,this.senha);
          const currentUser: Parse.User = Parse.User.current();
          console.log(currentUser.id);
          console.log(currentUser.attributes.role);
          this.roleUsuario = currentUser.attributes.role;
          this.idUsuario = currentUser.id;
          this.nomeUsuario = currentUser.attributes.nome;
          
          console.log('Logado no usuário: ', currentUser);
        } catch (error: any) {
          console.error('Erro ao logar', error);
        }
      })();
    })();

  }

  isPsicologo(){
    
    if(this.roleUsuario == "paciente"){
      return false;
    }else{
      return true;
    }
  }

  constructor(private route: ActivatedRoute, public dialogRef: MatDialog) { 
    
  }

  addAgendamento(){
    this.dialogRef.open(CriarAgendamentoComponent, {
      data : {
        nomeUsuario : this.nomeUsuario,
        idUsuario : this.idUsuario,
        roleUsuario : this.roleUsuario,
      },
      height: '400px',
      width: '600px',
    });
  }

  openSessao(){
    this.dialogRef.open(DisponibilizaSessaoComponent, {
      data : {
        nomeUsuario : this.nomeUsuario,
        idUsuario : this.idUsuario,
        roleUsuario : this.roleUsuario,
      },
      height: '400px',
      width: '600px',
    });
  }
}

