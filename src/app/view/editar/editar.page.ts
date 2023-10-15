import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { FirebaseService } from 'src/app/model/services/firebase-service.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  indice! : number;
  nome! : string;
  lancamento! : number;
  distribuidora! : string;
  genero! : number;
  tipo! : number;
  item! : Itens;
  edicao: boolean = true;

  constructor(private actRoute: ActivatedRoute, private firebase: FirebaseService, private router : Router, private alertController: AlertController) {

  }

  ngOnInit() {
    this.item = history.state.item;
    this.nome = this.item.nome;
    this.lancamento = this.item.lancamento;
    this.distribuidora = this.item.distribuidora;
    this.genero = this.item.genero;
    this.tipo = this.item.tipo;
  }

  habilitar(){
    if (this.edicao){
      this.edicao = false;
    }else {
      this.edicao = true;
    }
  }

  editar(){
    if (this.nome){
      let novo: Itens = new Itens(this.nome);
      novo.lancamento = this.lancamento;
      novo.distribuidora = this.distribuidora;
      novo.genero = this.genero;
      novo.tipo = this.tipo;
      this.firebase.editar(novo, this.item.id)
      .then(()=>{this.router.navigate(["/home"]);})
      .catch((error)=>{
        console.log(error);
        this.presentAlert("Erro", "Erro ao Atualizar Item");
      })
    }else {
      this.presentAlert("Erro", "Nome é um campo obrigatório!");
    }
  }

  excluir(){
    this.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir o jogo?")
  }

  excluirItem(){
    this.firebase.excluir(this.item.id)
    .then(() => {this.router.navigate(["/home"]);})
    .catch((error)=>{
      console.log(error);
      this.presentAlert("Erro", "Erro ao Excluir Contato!");
    })
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Jogos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Jogos',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancelar', role: 'cancelar', handler: ()=>{console.log("cancelou")}},
        {text: 'Confirmar', role: 'confirmar', handler: (acao)=>{this.excluirItem()}},
      ],
    });
    await alert.present();
  }

}
