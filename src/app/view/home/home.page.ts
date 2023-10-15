import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { FirebaseService } from 'src/app/model/services/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listaJogos : Itens[] = [];
  constructor(private router : Router, private firebase : FirebaseService) {
    this.firebase.buscarTodos().subscribe(res => {
      this.listaJogos = res.map(jogo => {
        return{
          id: jogo.payload.doc.id,
          ...jogo.payload.doc.data() as any
        }as Itens
      })
    })
  }

  irParaCadastro(){
    this.router.navigate(["/cadastro"]);
  }

  editar(itens : Itens){
    this.router.navigate(["/editar", {state : {itens : itens}}]);
  }
}
