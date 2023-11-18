import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { ItensService } from 'src/app/model/services/firebase-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  registerForm!: FormGroup;

  public nome! : string;
  public lancamento! : number;
  public distribuidora! : string;
  public genero! : number;
  public tipo! : number;
  public imagem! : any;

  constructor(private alertController: AlertController,
    private router : Router, private firebase : ItensService, private builder: FormBuilder){

    }
  
  ngOnInit() {
    
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  cadastro(){
    if (this.nome && this.lancamento) {
      let create: Itens = new Itens(this.nome, this.lancamento);
      create.distribuidora = this.distribuidora;
      create.genero = this.genero;
      create.tipo = this.tipo;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, create)
        ?.then(()=>{
          this.router.navigate(["/home"]);
        })
      }else {
        this.firebase.cadastrar(create).then(() => this.router.navigate(["/home"])).catch((error) =>{
        console.log(error);
        this.presentAlert("Erro", "Erro ao salvar contato!");
        })
      }   
      this.firebase.cadastrar(create);
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('ERRO!', 'Nome e lançamento são campos obrigatórios!');
    }
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

}
