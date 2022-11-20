import { Component, ViewChild } from '@angular/core';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  seleccion:string

  constructor() {}

  obtenerValor(e){
    console.log(e.detail.value)
     //this.categoria = e.detail.value;
     
     this.seleccion=e.detail.value;
    }

}
