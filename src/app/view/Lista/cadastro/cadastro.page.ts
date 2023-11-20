import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { AuthService } from 'src/app/model/services/auth.service';
import { ItensService } from 'src/app/model/services/firebase-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  cadastrar: FormGroup;
  imagem: FileList | null;
  user : any;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: ItensService,
    private router: Router,
    private alertController: AlertController,
    private authService : AuthService
  ) {
    this.cadastrar = this.formBuilder.group({
      nome: new FormControl(''),
      lancamento: new FormControl(''),
      distribuidora: new FormControl(''),
      genero: new FormControl(''),
      tipo: new FormControl(''),
      imagem: new FormControl('')
    });
    this.user = this.authService.getUsuarioLogado();

    this.imagem = null;
  }

  ngOnInit() {
    this.cadastrar = this.formBuilder.group({
      nome: ['', [Validators.required]],
      lancamento: ['', Validators.required],
      distribuidora: ['', Validators.required],
      genero: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      imagem: ['', [Validators.required]]
    })
  }
  uploadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target?.files && target?.files.length > 0) {
      const imagem = target.files;
      this.cadastrar.patchValue({ imagem: imagem });
      this.imagem = imagem;
    }
  }  

  cadastro() {
    if (this.cadastrar.valid) {
      const { nome, lancamento, distribuidora, genero, tipo } = this.cadastrar.value;
      const create: Itens = new Itens(nome, lancamento);
      create.distribuidora = distribuidora;
      create.genero = genero;
      create.tipo = tipo;
      create.uid = this.user.uid;

      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, create)
          ?.then(() => {
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.log(error);
            this.presentAlert('Erro', 'Erro ao salvar imagem!');
          });
      } else {
        this.firebase.cadastrar(create)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.log(error);
            this.presentAlert('Erro', 'Erro ao salvar contato!');
          });
      }
    } else {
      this.presentAlert('ERRO!', 'Preencha todos os campos obrigatórios!');
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
