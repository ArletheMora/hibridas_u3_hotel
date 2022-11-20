import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  seleccion:string

  constructor() {}

  obtenerValor(e){
    console.log(e.detail.value)
     //this.categoria = e.detail.value;
     
     this.seleccion=e.detail.value;
    }


}
