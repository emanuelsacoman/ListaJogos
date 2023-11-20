import { Inject, Injectable, Injector } from '@angular/core';
import { Itens } from '../entities/itens/Itens';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = "jogos";
  user: any;
  
  constructor(private firestore : AngularFirestore,
    @Inject(Injector) private readonly injector: Injector,
    private angularFireStorage : AngularFireStorage) {

    }

    private injectAuthService(){
      return this.injector.get(AuthService);
    }

  read(){
    this.user = this.injectAuthService().getUsuarioLogado();
    return this.firestore.collection(this.PATH, ref => ref.where('uid', '==', this.user.uid))
    .snapshotChanges();
  }


  obterTodos() {
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  register(itens : Itens) {
    return this.firestore.collection(this.PATH).add({
      nome: itens.nome,
      lancamento: itens.lancamento,
      distribuidora: itens.distribuidora,
      genero: itens.genero,
      tipo: itens.tipo,
      uid : itens.uid
    });
  }

  editar(itens: Itens, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: itens.nome,
      lancamento: itens.lancamento,
      distribuidora: itens.distribuidora,
      genero: itens.genero,
      tipo: itens.tipo,
      uid : itens.uid
    });
  }

  excluir(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }
}
