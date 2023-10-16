import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as Parse from 'parse';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-realizar-consulta',
  templateUrl: './realizar-consulta.component.html',
  styleUrls: ['./realizar-consulta.component.scss']
})
export class RealizarConsultaComponent implements OnInit{
  dataConsulta: string;
  nomePaciente: string;
  idConsulta: string;
  valorConsulta: number;
  meioPagamento: string;
  notasConsulta: string;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, private toastr: ToastrService){
  this.idConsulta = data.idConsulta;
  this.dataConsulta = data.data;
  this.nomePaciente = data.nomePaciente;
  this.valorConsulta = data.valor;
  //console.log(this.idConsulta);
}

ngOnInit(): void {
  //PEGAR DADOS DA CONSULTA ESCOLHIDA
  
}

updateConsulta(){
  (async () => {
    const Appointment: Parse.Object = Parse.Object.extend('Appointment');
    const query: Parse.Query = new Parse.Query(Appointment);
    try {
      // here you put the objectId that you want to update
      const object: Parse.Object = await query.get(this.idConsulta);
      object.set('pago', true);
      object.set('notas', this.notasConsulta);
      object.set('realizado', true);
      object.set('meioPagamento', this.meioPagamento);
      try {
        const response: Parse.Object = await object.save();
        console.log(response.get('pago'));
        console.log(response.get('notas'));
        console.log(response.get('idSessao'));
        console.log(response.get('realizado'));
        console.log(response.get('idPaciente'));
        console.log(response.get('meioPagamento'));
        console.log('Consulta Realizada', response);
      } catch (error: any) {
        console.error('Error ao atualizar consulta', error);
        }
      } catch (error: any) {
        console.error('Error ao encontrar consulta', error);
      }
  })();
}

}
