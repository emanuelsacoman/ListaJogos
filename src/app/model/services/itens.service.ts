import { Injectable } from '@angular/core';
import { Itens } from '../entities/itens/Itens';

@Injectable({
  providedIn: 'root'
})
export class ItensService {
  public listaJogos : Itens[] = [];
  constructor() {
    let i1 :Itens = new Itens("Grand Theft Auto V");
    this.listaJogos.push(i1);

    let i2 :Itens = new Itens("Counter Strike: Global Offensive");
    this.listaJogos.push(i2);

    let i3 :Itens = new Itens("Among Us");
    this.listaJogos.push(i3);

    let i4 :Itens = new Itens("Minecraft");
    this.listaJogos.push(i4);
  }

  cadastrar(item : Itens){
    this.listaJogos.push(item);
  }

  obterTodos() : Itens[]{
    return this.listaJogos;
  }

  obterPorIndice(indice : number) : Itens{
    return this.listaJogos[indice];
  }

  atualizar(indice : number, novo : Itens){
    this.listaJogos[indice] = novo;
  }

  deletar(indice : number){
    this.listaJogos.splice(indice, 1);
  }
}
