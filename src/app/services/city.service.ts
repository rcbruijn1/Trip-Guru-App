import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CityService {
  baseUrl = 'http://localhost:3000/api/v1/cities';
  city: any;
  location: any;

  constructor(private _http : Http) {

   }

   getCities() {
     return this._http.get(this.baseUrl)
     .map(res=>res.json());
   }

   getCityById(_id:string) {
    return this._http.get(this.baseUrl + '/' + _id)
    .map(res=>res.json());
  }

  addCity(city){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post('http://localhost:3000/api/v1/cities', city, {headers: headers})
    .map(res => res.json());
  }

  addLocationById(_id:string, location){

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(this.baseUrl + '/' + _id, location, {headers: headers})
    .map(res => res.json());
  }

  deleteCity(_id:string){

      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this._http.delete(this.baseUrl + '/' + _id, {headers: headers})
    }

  }