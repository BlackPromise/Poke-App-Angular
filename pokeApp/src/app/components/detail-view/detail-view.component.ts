import { Component, OnInit } from '@angular/core';
import { PokemonInfo } from 'src/app/models/pokemonInfo';
import { DetailViewService } from 'src/app/services/detail-view.service';
import { Global } from 'src/app/utilities/global';
import { MyData } from 'src/app/utilities/myData';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent extends Global implements OnInit {

  constructor(public detailViewService: DetailViewService, public myData: MyData) {
    super(myData);
    this.item = JSON.parse(sessionStorage.getItem('_Inf')).find((Obj) => {
      // tslint:disable-next-line: no-string-literal tslint:disable-next-line: radix
      return Obj.id === parseInt(this.Params['id']);
    });
  }
  item: PokemonInfo;
  cargando = false;
  info: any = {
    spritesArray: []
  };

  ngOnInit() {
    this.cargando = true;
    // tslint:disable-next-line: no-string-literal
    this.Params['id'] = this.Params['id'] ? this.Params['id'] : -1;
    // tslint:disable-next-line: no-string-literal
    this.detailViewService.detail(this.Params['id']).subscribe(
      (res) => {
        console.log(res);
        this.info = res;
        this.info.spritesArray = this.objectToArray(this.info.sprites);
        this.lock();
      },
      error => {
        console.log(error);
      },
      () => {
        this.cargando = false;
        this.unLock();
      }
    );
  }

}
