import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Routes } from '../utilities/routes';

@Injectable({
  providedIn: 'root'
})
export class DetailViewService extends Routes {

  constructor(public http: HttpClient) {
    super();
  }

  detail(id) {
    return this.http.get(`${this.Base}/pokemon/${id}/`);
  }

  description(id) {
    return this.http.get(`${this.Base}/pokemon-species/${id}/`);
  }

  abilities(url) {
    return this.http.get(url);
  }
}
