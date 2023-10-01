import { Component } from '@angular/core';
import * as Parse from 'parse';
import { Sessao } from '../../interfaces/sessao';
import { format } from 'date-fns';
import { MatSelectChange } from '@angular/material/select';



@Component({
  selector: 'app-criar-agendamento',
  templateUrl: './criar-agendamento.component.html',
  styleUrls: ['./criar-agendamento.component.scss']
})
export class CriarAgendamentoComponent {

  sessoes: Sessao[] = [];

  dataEscolhida: string;
  sessaoEscolhida: string;
  sessaoAgendada: Sessao;
  nomePsi: string;
  nomePsicologoSessaoAgendada: string;
  idSessaoAgendada: string ;
  valorSessaoAgendada: any;
  idProfissionalSessaoAgendada: string;
  sessaoAgendamento: any;

  idSessaoEscolhida(id: string){
    this.sessaoEscolhida = id;
    console.log(id);
    (async () => {
      const Session: Parse.Object = Parse.Object.extend('Session');
      const query: Parse.Query = new Parse.Query(Session).equalTo('objectId', this.sessaoEscolhida).include("owner");
      // You can also query by using a parameter of an object
      // query.equalTo('objectId', 'xKue915KBG');
      try {
        const results: Parse.Object[] = await query.find();
        for (const object of results) {
          // Access the Parse Object attributes using the .GET method
          //this.sessaoAgendada.data = object.get('data')
          this.valorSessaoAgendada = object.get('valor')
          const objectPsicologoSessaoAgendada = object.get('idPsicologo');
          this.nomePsicologoSessaoAgendada = objectPsicologoSessaoAgendada.attributes.nome;
          //this.idProfissionalSessaoAgendada = objectPsicologoSessaoAgendada.toPointer();
          
          this.idSessaoAgendada = object.id;
          this.sessaoAgendamento = object.toPointer();
          //console.log(this.sessaoAgendada.data)
          //console.log(idProfissionalSessaoAgendada)
          //console.log(this.nomePsicologoSessaoAgendada)
          //console.log(this.idSessaoAgendada)
        }
      } catch (error: any) {
        console.error('Error while fetching Session escolhida', error);
      }
    })();
  }

  addAgendamento(){
    //MUDAR STATUS DE SESSAO PARA NAO DISPONIVEL MAIS
    (async () => {
      const Session: Parse.Object = Parse.Object.extend('Session');
      const query: Parse.Query = new Parse.Query(Session);
      try {
        // here you put the objectId that you want to update
        const object: Parse.Object = await query.get(this.idSessaoAgendada);
        object.set('agendada', true);
        try {
          const response: Parse.Object = await object.save();
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          // Access the Parse Object attributes using the .GET method
          console.log(response.get('agendada'));
          console.log('Sessao Agendada', response);
        } catch (error: any) {
          console.error('Erro ao agendar sessão', error);
          }
        } catch (error: any) {
          console.error('Error while retrieving object Session', error);
        }
    })();
    //CRIANDO AGENDAMENTO
    (async () => {
      const myNewObject: Parse.Object = new Parse.Object('Appointment');
      myNewObject.set('idSessao', this.sessaoAgendamento);
      const currentUser = Parse.User.current().toPointer();
      myNewObject.set('idPaciente', currentUser);
      //myNewObject.set('idPsicologo', this.idProfissionalSessaoAgendada);
      try {
        const result: Parse.Object = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log('Appointment created', result);
      } catch (error: any) {
        console.error('Error while creating Appointment: ', error);
      }
    })();
  }

  ngOnInit(){
    
    (async () => {
      
      const Session: Parse.Object = Parse.Object.extend('Session');
      const query: Parse.Query = new Parse.Query(Session).equalTo('agendada', false).include("owner");
      // You can also query by using a parameter of an object
      // query.equalTo('objectId', 'xKue915KBG');
      try {
        const sessoes: Parse.Object[] = await query.find();
        for (const object of sessoes) {
          // Access the Parse Object attributes using the .GET method
          const data: string = object.get('data')
          const valor: string = object.get('valor')

          // Passo 1: Analisar a string de data em um objeto Date
          const dataOriginal = new Date(data);

          // Passo 2: Formatar a data no formato brasileiro
          const dataFormatoBrasileiro = `${dataOriginal.getDate().toString().padStart(2, '0')}/` +
          `${(dataOriginal.getMonth() + 1).toString().padStart(2, '0')}/` +
          `${dataOriginal.getFullYear()} ` + 
          `às ${dataOriginal.getHours().toString().padStart(2, '0')}:` +
          `${dataOriginal.getMinutes().toString().padStart(2, '0')}`;

          //const agendada: string = object.get('agendada')
          const idPsicologo: any = object.get('idPsicologo')
          this.nomePsi = 'Não Encontrado';
          console.log(data);
          //const dia: () => number = data.getDate;
          //console.log(dia);
          //console.log(data.getMonth)
          //const dataSessao: string = `${dia}/${data.getMonth}/${data.getFullYear}`
          console.log(valor);
          //console.log(agendada);
          console.log(object.id); //id da sessao
          console.log(object.attributes.idPsicologo); //id do ponteiro do psicologo responsavel
        
          const psicologo: Parse.User = new Parse.User();
          const query: Parse.Query = new Parse.Query(psicologo);
          
          try {
            let psicologo: Parse.Object = await query.get(idPsicologo);
            this.nomePsi = idPsicologo.attributes.nome;

          } catch (error: any) {
            console.error('Error while fetching nome do psicologo', error);
          }
          const sessao: Sessao = {
            data: dataFormatoBrasileiro,
            valor : valor,
            id: object.id,
            nomePsicologo : this.nomePsi
          };
          

          this.sessoes.push(sessao);


          
        }
      } catch (error: any) {
        console.error('Error while fetching Session', error);
      }
    })();
  }

}
