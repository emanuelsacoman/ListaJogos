import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { confirmAlert } from 'src/app/common/confirmAlert';
import { GoBackPage } from 'src/app/common/goBackPage';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { AuthService } from 'src/app/model/services/auth.service';
import { ItensService } from 'src/app/model/services/firebase-service.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  editar!: FormGroup;
  user: any;
  jogo!: Itens;
  imagem: any;
  edicao: boolean = true;

  indice! : number;
  nome! : string;
  lancamento! : number;
  distribuidora! : string;
  genero! : number;
  tipo! : number;

  constructor(
    private firebase: ItensService, private router: Router, private alert: Alert, private confirmAlert: confirmAlert, private goBack: GoBackPage, private auth: AuthService, private formBuilder: FormBuilder){
    this.user = this.auth.getUsuarioLogado();
  }

  ngOnInit(){
    this.jogo = history.state.jogo;
    this.nome = this.jogo?.nome;
    this.lancamento = this.jogo?.lancamento;
    this.distribuidora = this.jogo?.distribuidora;
    this.genero = this.jogo?.genero;
    this.tipo = this.jogo?.tipo;

    this.editar = this.formBuilder.group({
      nome: [this.jogo.nome, [Validators.required]],
      lancamento: [this.jogo.lancamento, [Validators.required, Validators.minLength(2)]],
      distribuidora: [this.jogo.distribuidora, [Validators.required, Validators.minLength(2)]],
      genero: [this.jogo.genero, [Validators.required]],
      tipo: [this.jogo.tipo, [Validators.required]],
      imagem: [null],
    });
  }

  uploadFile(event: any){
    this.imagem = event.target.files;
  }

  editItem() {
    if (this.editar.valid){
      const new_part: Itens = {...this.editar.value,uid: this.user.uid,id: this.jogo.id,downloadURL: this.jogo.downloadURL};

      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, new_part)?.then(() =>{
          this.router.navigate(['/home'])
        });
      }else{
        new_part.downloadURL = this.jogo.downloadURL;

        this.firebase.editar(new_part, this.jogo.id).then(() => this.router.navigate(['/home'])).catch((error) =>{
          console.log(error);
          this.alert.presentAlert('Erro', 'Erro ao atualizar a parte!');
        });
      }
    }else{
      this.alert.presentAlert('Erro!', 'Verifique os campos obrigatórios!');
    }
  }
  confirmDelete(){
    this.confirmAlert.presentConfirmAlert('ATENÇÃO', 'Deseja realmente excluir a Parte?', (confirmed) =>{
      if(confirmed){
        this.deletePart();
      }
    });
  }

  deletePart(){
    this.firebase.excluir(this.jogo.id).then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {console.log(error);
        this.alert.presentAlert('Erro', 'Erro ao excluir a Parte!');
      });
  }

  goBackPage(){
    this.goBack.goBackPage();
  }

  habilitar(){
    if (this.edicao){
      this.edicao = false;
    }else {
      this.edicao = true;
    }
  }
}