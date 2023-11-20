import { AlertController } from "@ionic/angular";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class confirmAlert{
    constructor(private alertController: AlertController){}

    async presentConfirmAlert(subHeader: string, message: string, callBack: (result: boolean) => void) {
        const alert = await this.alertController.create({
          header: 'Agenda de Contatos',
          subHeader: subHeader,
          message: message,
          buttons: [
            {text: "Cancelar", role: 'cancelar', handler: ()=>{console.log("cancelou")}},
            {text: "Confirmar", role: 'confirmar', handler: ()=>{callBack(true)}}
          ],
        });
      
        await alert.present();
        }
}