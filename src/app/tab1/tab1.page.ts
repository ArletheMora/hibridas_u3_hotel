import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  seleccion:string
  t1:string;
  t2:string;
  t3:string;

  constructor() {}
  

  obtenerValor(e){
    console.log(e.detail.value)
     //this.categoria = e.detail.value;
     
     this.seleccion=e.detail.value;
    }

    mostrar(){
      if(this.seleccion=='1'){
        this.t1="Hola";
      }else if(this.seleccion=='2'){
        this.t1="Hello"
      }else{
        this.t1="sdsdsd"
      }
    }

}
