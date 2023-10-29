import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { ItensService } from 'src/app/model/services/firebase-service.service';

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
  imagem! : any;
  tipo! : number;
  jogo! : Itens;
  edicao: boolean = true;

  constructor(private actRoute: ActivatedRoute, 
    private firebase : ItensService, 
    private router : Router, 
    private alertController: AlertController) {

  }

  ngOnInit() {
    this.jogo = history.state.jogo;
    this.nome = this.jogo?.nome;
    this.lancamento = this.jogo?.lancamento;
    this.distribuidora = this.jogo?.distribuidora;
    this.genero = this.jogo?.genero;
    this.tipo = this.jogo?.tipo;
  }

  habilitar(){
    if (this.edicao){
      this.edicao = false;
    }else {
      this.edicao = true;
    }
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  editar(){
    if (this.nome && this.lancamento) {
      let create: Itens = new Itens(this.nome, this.lancamento);
      create.distribuidora = this.distribuidora;
      create.genero = this.genero;
      create.tipo = this.tipo;
      create.id = this.jogo.id;

      if(this.imagem){
        this.firebase.uploadImage(this.imagem, create)
        ?.then(()=>{this.router.navigate(["/home"]);})
      }else{
        create.downloadURL = this.jogo.downloadURL;
        this.firebase
          .editar(create, this.jogo.id)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.log(error);
            this.presentAlert('ERRO', 'Erro ao editar jogo!');
          })
      }
    } else {
      this.presentAlert('ERRO', 'Nome e lançamento são campos obrigatórios!');
    }
  }

  excluir(){
    this.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir o jogo?");
  }

  excluirJogo(){
    this.firebase
      .excluir(this.jogo.id)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
        this.presentAlert('ERRO', 'Erro ao excluir jogo!');
      });
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
        {text: 'Confirmar', role: 'confirmar', handler: (acao)=>{this.excluirJogo()}},
      ],
    });
    await alert.present();
  }

}
