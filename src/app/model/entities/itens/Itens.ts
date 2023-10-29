export class Itens {
    private _id!: string;
    private _nome : string;
    private _lancamento! : number;
    private _distribuidora! : string;
    private _genero! : number;
    private _tipo! : number;
    private _downloadURL : any;

    constructor(nome : string, lancamento : number){
        this._nome = nome;
        this._lancamento = lancamento;
    }

    //get set nome

    public get nome() : string {
        return this._nome;
    }

    public set nome(nome: string){
        this._nome = nome;
    }

    //get set lancamento

    public get lancamento() : number {
        return this._lancamento;
    }

    public set lancamento(lancamento: number){
        this._lancamento = lancamento;
    }

    //get set distribuidora

    public get distribuidora() : string {
        return this._distribuidora;
    }

    public set distribuidora(distribuidora: string){
        this._distribuidora = distribuidora;
    }
    
    //get set genero
    
    public get genero() : number {
        return this._genero;
    }

    public set genero(genero: number){
        this._genero = genero;
    }

    //get set tipo

    public get tipo() : number {
        return this._tipo;
    }

    public set tipo(tipo: number){
        this._tipo = tipo;
    }

    public get id(): string {
        return this._id;
      }
      public set id(value: string) {
        this._id = value;
      }

      public get downloadURL() : any {
        return this._downloadURL;
      }
      
      public set downloadURL(value : any){
        this._downloadURL = value;
      }
    
}