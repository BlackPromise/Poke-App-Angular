import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Routes } from '../utilities/routes';

@Injectable({
  providedIn: 'root'
})
export class MainViewService extends Routes  {

  constructor(public http: HttpClient) {
    super();
   }

  main(page: number = 1, limit: number = 10) {
    page = page < 1 ? 1 : page;
    limit = limit < 1 ? 10 : limit;
    return this.http.get(`${this.Base}/pokemon?offset=${((page - 1) * limit)}&limit=${limit}`);
  }

}
