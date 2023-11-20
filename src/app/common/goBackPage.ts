import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })

export class GoBackPage{

    constructor(private router: Router){}

    goBackPage(){
        this.router.navigate(['/home'])
      }
}