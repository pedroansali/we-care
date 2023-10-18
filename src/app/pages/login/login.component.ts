import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Parse from 'parse';
import { ToastrService  } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../styles.scss']
})
export class LoginComponent {


  userData = {
    usuario: '',
    senha: ''
  };

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
  }

  login(){
    (async () => {
      try {
        // Pass the username and password to logIn function
        let user: Parse.User = await Parse.User.logIn(this.userData.usuario,this.userData.senha);
        // Do stuff after successful login
        console.log('Logado no usuário', user);
        //this.toastr.success('Login bem sucedido');
        this.router.navigate(['home'], { queryParams: { usuario: this.userData.usuario, senha: this.userData.senha } });
      } catch (error: any) {
        console.error('Erro ao logar com o usuário informado', error);
      }
    })();
  }
  

}
