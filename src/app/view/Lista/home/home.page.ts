import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase-service.service.spec';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listaJogos: Itens[] = [];
  
  constructor(
    private router: Router,
    private alertController: AlertController,
    private firebase: FirebaseService,
    private auth: AuthService
  ) {
    this.firebase.obterTodos().subscribe((res) => {
      this.listaJogos = res.map((jogo) => {
        return {
          id: jogo.payload.doc.id,
          ...(jogo.payload.doc.data() as any),
        } as Itens;
      });
    });
  }

  irParaCadastro(){
    this.router.navigate(["/cadastro"]);
  }

  editar(jogo : Itens){
    this.router.navigateByUrl("/editar", {state: { jogo: jogo } });
  }

  irParaGithub(){ 
    window.open('https://github.com/emanuelsacoman', '_blank');
  }

  deslogar() {
    this.auth.deslogar()
      .then(() => {
        this.router.navigate(['/login']); 
      })
      .catch(error => {
        console.log('Erro ao fazer logout:', error);
      });
  }
}
