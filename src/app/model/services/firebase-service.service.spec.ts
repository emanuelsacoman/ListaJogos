import { Injectable } from '@angular/core';
import { Itens } from '../entities/itens/Itens';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = "jogos";
  constructor(private firestore : AngularFirestore) { }

  obterTodos() {
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  register(itens : Itens) {
    return this.firestore.collection(this.PATH).add({
      nome: itens.nome,
      lancamento: itens.lancamento,
      distribuidora: itens.distribuidora,
      genero: itens.genero,
      tipo: itens.tipo
    });
  }

  editar(itens: Itens, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: itens.nome,
      lancamento: itens.lancamento,
      distribuidora: itens.distribuidora,
      genero: itens.genero,
      tipo: itens.tipo
    });
  }

  excluir(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }
}
