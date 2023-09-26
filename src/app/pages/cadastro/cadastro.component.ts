import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  selectedFunction: string;

  selectFunction(functionName: string) {
    this.selectedFunction = functionName;
  }
}
