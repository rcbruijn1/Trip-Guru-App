import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CityLocationService {
  baseUrl = 'http://localhost:3000/api/v1/city-locations';
  location: any;

  constructor(private _http : Http) { }

  getLocations() {
    return this._http.get(this.baseUrl)
    .map(res=>res.json());
  }

  addLocation(location){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post('http://localhost:3000/api/v1/city-locations', location, {headers: headers})
    .map(res => res.json());
  }

  deleteLocation(_id:string){

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.delete(this.baseUrl + '/' + _id, {headers: headers})
  }

}
