import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {
  baseUrl = 'http://localhost:3000/api/v1/journeys';
  journey: any;

  constructor(private _http : Http) { }

  getJourneys() {
    return this._http.get(this.baseUrl)
    .map(res=>res.json());
  }

  addJourney(journey){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post('http://localhost:3000/api/v1/journey', journey, {headers: headers})
    .map(res => res.json());
  }

  addCityById(_id:string, city){

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(this.baseUrl + '/' + _id, city, {headers: headers})
    .map(res => res.json());
  }

}
