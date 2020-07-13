import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResourceList } from 'src/app/models/APIResourceList';
import { PokemonInfo } from 'src/app/models/pokemonInfo';
import { MainViewService } from 'src/app/services/main-view.service';
import { Global } from 'src/app/utilities/global';
import { MyData } from 'src/app/utilities/myData';
import { Routes } from 'src/app/utilities/routes';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent extends Global implements OnInit {

  constructor(public mainViewService: MainViewService, public myData: MyData) {
    super(myData);
  }
  // tslint:disable-next-line: no-string-literal
  pagina = this.Params['p'] || 1;
  cantidad = 12;
  cantidadDistancia = 2;
  ngOnInit() {
    console.log('MainViewComponent');
  }

  get data() {
    return this.Pages(this.get().length <= this.cantidad ? [] : this.get(), this.pagina, this.cantidad);
  }

  get limites() {
    return {
      min: (this.pagina - this.cantidadDistancia < 1 ? 1 : this.pagina - this.cantidadDistancia),
      max: (this.lstpaginas.length < this.pagina + this.cantidadDistancia ? this.lstpaginas.length : this.pagina + this.cantidadDistancia)
    };
  }

  get lstpaginas(): Array<number> {
    const retorno: Array<number> = [];
    const totalPaginas = Math.ceil((this.get().length <= this.cantidad ? [] : this.get()).length / this.cantidad);
    for (let i = 1; i <= totalPaginas; i++) {
      retorno.push(i);
    }
    return retorno;
  }


  irPrimeraPagina() {
    this.pagina = 1;
  }

  irUltimaPagina() {
    this.pagina = this.lstpaginas.length;
  }

  irAPagina(pagina) {
    this.pagina = pagina;
  }
}
