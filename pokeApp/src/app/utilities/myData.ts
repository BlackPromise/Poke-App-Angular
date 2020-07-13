import { Injectable } from '@angular/core';

import { APIResourceList } from '../models/APIResourceList';
import { PokemonInfo } from '../models/pokemonInfo';
import { DetailViewService } from '../services/detail-view.service';
import { MainViewService } from '../services/main-view.service';
import { MyStorage } from './myStorage';

@Injectable({
    providedIn: 'root'
})
export class MyData extends MyStorage {

    lang = 'en';
    stats = {
        es: {
            speed: 'Velocidad',
            hp: 'HP',
            attack: 'Ataque',
            defense: 'Defensa',
            'special-attack': 'Ataque especial',
            'special-defense': 'Defensa especial'
        }
    };

    statsDefault = {
        speed: 'Speed',
        hp: 'HP',
        attack: 'Attack',
        defense: 'Defense',
        'special-attack': 'Special attack',
        'special-defense': 'Special defense'
    };

    Data: any[];
    Items: any[];
    constructor(public mainViewService: MainViewService, public detailViewService: DetailViewService) {
        super();
    }

    loadData() {
        if (this.get().length <= 0) {
            this.post([1]);
            this.Data = [];
            this.mainViewService.main(0, 999999).subscribe(
                (res: APIResourceList) => {
                    this.Items = res.results;
                    this.next();
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    next() {
        setTimeout(() => {
            if (this.Items.length > 0) {
                this.detailViewService.detail(this.Items[0].url.split('/').reverse()[1]).subscribe(
                    (res2: any) => {
                        // tslint:disable-next-line: prefer-const
                        let pokemon: PokemonInfo = {
                            id: res2.id,
                            name: res2.name,
                            img: this.ImgRoute(res2.id),
                            weight: res2.weight,
                            height: res2.height,
                            stats: res2.stats.map((stat) => {
                                return {
                                    key: (this.stats[this.lang] || this.statsDefault)[stat.stat.name],
                                    value: stat.base_stat
                                };
                            }),
                            types: res2.types.map((type) => {
                                return type.type.name;
                            }),
                            abilities: [],
                            description: '',
                        };
                        this.detailViewService.description(pokemon.id).subscribe((res3: any) => {
                            res3.flavor_text_entries.forEach((desc: any) => {
                                if (desc.language.name === this.lang) {
                                    pokemon.description =  desc.flavor_text;
                                }
                            });
                            res2.abilities.forEach((resp4: any) => {
                                this.detailViewService.abilities(resp4.ability.url).subscribe(
                                    (resp5: any) => {
                                        const ability = {
                                            name: '',
                                            description: ''
                                        };
                                        resp5.flavor_text_entries.forEach(item => {
                                            if (item.language.name === this.lang) {
                                                ability.description = item.flavor_text;
                                            }
                                        });
                                        resp5.names.forEach(item => {
                                            if (item.language.name === this.lang) {
                                                ability.name = item.name;
                                            }
                                        });
                                        pokemon.abilities.push(ability);
                                    }
                                );
                            });
                            this.Data.push(pokemon);
                            this.post(this.Data);
                            this.Items.splice(0, 1);
                            this.next();
                        }, error3 => {
                            console.log('error3', error3);
                        });
                    },
                    error2 => {
                        console.log(error2);
                    }
                );
            }
        }, 500);
    }
}
