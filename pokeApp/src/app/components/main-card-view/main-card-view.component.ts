import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonInfo } from 'src/app/models/pokemonInfo';
import { Global } from 'src/app/utilities/global';
import { MyData } from 'src/app/utilities/myData';

@Component({
  selector: 'app-main-card-view',
  templateUrl: './main-card-view.component.html',
  styleUrls: ['./main-card-view.component.css']
})
export class MainCardViewComponent extends Global implements OnInit {

  @Input() item: PokemonInfo;

  constructor(private router: Router, public myData: MyData) {
    super(myData);
  }

  ngOnInit() {
  }

  detail() {
    this.router.navigate(['/detail/', { id: this.item.id }]);
  }
}
