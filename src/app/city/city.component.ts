import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CityService} from '../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService]
})
export class CityComponent implements OnInit {
  city: any;
  cityId: string;
  private sub: any;

  constructor(private cityService: CityService, private router : Router, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.currentRoute.params.subscribe(
      params => {
        this.cityId = params.id;
      }
    )
    console.log(this.cityId);
    this.cityService.getCityById(this.cityId)
      .subscribe(res => {
        this.city = res;
        console.log(this.city);
      })
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);
    }

}
