import { Component } from '@angular/core';
import * as Parse from 'parse';
import { Agendamento } from 'src/app/interfaces/agendamento';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss', '../../../styles.scss']
})
export class PerfilComponent {
  roleUsuario: string;
  nomeUsuario: string;
  idUsuario: string;
  psicologo: boolean;
  listaAgendamentos: Agendamento[] = [];
  agendamentoAtual: Agendamento;
  idPsicologoSessao: string;;

  ngOnInit() {
    const currentUser = Parse.User.current();
    (async () => {
      (async () => {
        try {
          const currentUser: Parse.User = Parse.User.current();
          console.log(currentUser.id);
          console.log(currentUser.attributes.role);
          this.roleUsuario = currentUser.attributes.role;
          this.idUsuario = currentUser.id;
          this.nomeUsuario = currentUser.attributes.nome;

          if(currentUser.attributes.role == "paciente"){
            this.psicologo = false;
          }else{
            this.psicologo = true;
          }

          if(this.psicologo){
            console.log("cehga aq");
            //PEGAR AGENDAMENTOS
            (async () => {
              const Appointment: Parse.Object = Parse.Object.extend('Appointment');
              const query: Parse.Query = new Parse.Query(Appointment).include("owner");
      
              try {
                const results: Parse.Object[] = await query.find();
                for (const object of results) {
                  console.log(object);
                  
                  const Session: Parse.Object = Parse.Object.extend('Session');
                  const querySession: Parse.Query = new Parse.Query(Session).equalTo('objectId', object.attributes.idSessao.id);
                  const User: Parse.User = new Parse.User();
                  const queryUser: Parse.Query = new Parse.Query(User);
                  try {
                    let user: Parse.Object = await queryUser.get(object.attributes.idPaciente.id);
                    //console.log(user);
                    const results: Parse.Object[] = await querySession.find();
                    for (const sessao of results) {  
                      const data: string = sessao.get('data');
                      const dataOriginal = new Date(data);
                      const dataFormatoBrasileiro = `${dataOriginal.getDate().toString().padStart(2, '0')}/` +
                        `${(dataOriginal.getMonth() + 1).toString().padStart(2, '0')}/` +
                        `${dataOriginal.getFullYear()} ` + 
                        `às ${dataOriginal.getHours().toString().padStart(2, '0')}:` +
                        `${dataOriginal.getMinutes().toString().padStart(2, '0')}`;            
                      const idPsicologo = sessao.get('idPsicologo');
                      console.log(idPsicologo);
                      //SE SESSAO REFERENTE AO AGENDAMENTO FOR DO PSICOLOGO
                      //console.log(object);                
                      if(idPsicologo.id == currentUser.id && object.attributes.realizado == false){
                        //PEGAR INFO DO AGENDAMENTO E ADICIONAR A LISTA
                        this.agendamentoAtual = {
                          id: object.id,
                          nome: object.attributes.idPaciente.attributes.nome,//nome paciente
                          valor: object.attributes.idSessao.attributes.valor,
                          data: dataFormatoBrasileiro,
                        }
                        console.log(this.agendamentoAtual);
                        this.listaAgendamentos.push(this.agendamentoAtual);
                        console.log(this.listaAgendamentos);
                      }
                    }
                  } catch (error: any) {
                    console.error('Error ao buscar sessao', error);
                  }
                  
                }
              } catch (error: any) {
                console.error('Error while fetching Appointment', error);
              }
            })();
      
          }else{
            console.log("parte do paciente");
          //LISTAR CONSULTAS AGENDADAS PRO USUÁRIO
            (async () => {
              const Appointment: Parse.Object = Parse.Object.extend('Appointment');
              const query: Parse.Query = new Parse.Query(Appointment).equalTo('idPaciente', currentUser.id).equalTo('realizado', false).include("owner");
              try {
                const lista: Parse.Object[] = await query.find();
                for (const agendamento of lista) {         
                  //BUSCAR SESSÃO PRA PEGAR PSICOLOGO
                  const idSessao: string = agendamento.attributes.idSessao.id;
                  (async () => {
                    const Session: Parse.Object = Parse.Object.extend('Session');
                    const query: Parse.Query = new Parse.Query(Session).equalTo('objectId', idSessao);
                    try {
                      const sessoes: Parse.Object[] = await query.find();
                      for (const sessao of sessoes) {
                        // ACHOU A SESSAO
                        const idPsicologoSessao: string = sessao.get('idPsicologo');
      
                        const data: string = sessao.get('data');
                        const dataOriginal = new Date(data);
                        const dataFormatoBrasileiro = `${dataOriginal.getDate().toString().padStart(2, '0')}/` +
                        `${(dataOriginal.getMonth() + 1).toString().padStart(2, '0')}/` +
                        `${dataOriginal.getFullYear()} ` + 
                        `às ${dataOriginal.getHours().toString().padStart(2, '0')}:` +
                        `${dataOriginal.getMinutes().toString().padStart(2, '0')}`;
                        console.log(dataFormatoBrasileiro);
                        this.idPsicologoSessao = idPsicologoSessao;
      
                        //BUSCAR PSICOLOGO DA SESSAO
                        (async () => {
                          const User: Parse.User = new Parse.User();
                          const query: Parse.Query = new Parse.Query(User);
                        
                          try {
                            let user: Parse.Object = await query.get(this.idPsicologoSessao);
                            //this.agendamento.nomePsicologo = user.nome;
                            //console.log('Nome do psicologo encontrado');
      
                            this.agendamentoAtual  = {
                              id: agendamento.id,
                              nome: user.attributes.nome,
                              valor: sessao.get('valor'),
                              data: dataFormatoBrasileiro,
                            }
      
                            this.listaAgendamentos.push(this.agendamentoAtual);
                            
                          } catch (error: any) {
                            console.error('Erro ao buscar nome do psicologo', error);
                          }
                        })();
                      }
                      
                    } catch (error: any) {
                      console.error('Erro ao buscar sessao para pegar nome do psicólogo', error);
                    }
                  })();
                  console.log("chega aq");
                  console.log(this.listaAgendamentos)
                  
                }
              } catch (error: any) {
                console.error('Erro ao buscar agendamentos do usuário', error);
              }
            })();
          }
          
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
}

