import { Injectable } from '@angular/core';
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class Alert{

  constructor(private alertController: AlertController){}

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de jogos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}