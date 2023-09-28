import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Parse from 'parse';
import {MatDialog} from '@angular/material/dialog';
import { DisponibilizaSessaoComponent } from '../../components/disponibiliza-sessao/disponibiliza-sessao.component'


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



  isPsicologo(){
    if(this.roleUsuario == "paciente"){
      return false;
    }else{
      return true;
    }
  }

  ngOnInit() {
    // Dado do usuário que vem do login
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.senha = params['senha'];
    });
    (async () => {
      const query: Parse.Query = new Parse.Query('User').equalTo('username',this.usuario);
      // You can also query by using a parameter of an object
      // query.equalTo('objectId', 'xKue915KBG');
      const results: Parse.Object[] = await query.find();
      try {
        for (const object of results) {
          // Access the Parse Object attributes using the .GET method
          const nomeUsuario: string = object.get('nome');
          const idUsuario: any = object.get('objectId');
          const roleUsuario: string = object.get('role');
          this.nomeUsuario = nomeUsuario;
          this.idUsuario = JSON.parse(JSON.stringify(results));
          this.idUsuario = idUsuario[0].objectId;
          this.roleUsuario = roleUsuario;
          console.log(idUsuario);
        }
      } catch (error: any) {
        console.error('Error while fetching User', error);
      }
    })();

  }

  constructor(private route: ActivatedRoute, public dialogRef: MatDialog) { 
    
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

