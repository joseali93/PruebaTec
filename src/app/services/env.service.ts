import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'https://testbankapi.firebaseio.com/';
  get = 'clients.json';
  constructor() { }
}
