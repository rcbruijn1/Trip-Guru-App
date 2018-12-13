import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CityService} from '../services/city.service';
import { JourneyService } from '../services/journey.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService]
})
export class CityComponent implements OnInit {
  city: any;
  cityId: string;
  journeys: any;
  journeyId: any;
  private sub: any;

  constructor(private cityService: CityService, private journeyService : JourneyService, private flashMessage : FlashMessagesService, private router : Router, private currentRoute: ActivatedRoute) { }

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

      this.journeyService.getJourneys()
    .subscribe(res => {
      this.journeys = res;
      console.log(res)
    })
  }

  onSelectJourney(event) {
    this.journeyId = event.target.value;
    console.log(this.journeyId);
  }

  onCityAdded() {
    const city = {
      _id: this.cityId
    }
    console.log(this.journeyId);
    this.journeyService.addCityById(this.journeyId, city).subscribe(data => {
      if (data) {
        this.flashMessage.show("City is added to your journey!", {cssClass: 'alert-success', timeout: 3000});
      }else{
        this.flashMessage.show("Failed to add!", {cssClass: 'alert-danger', timeout: 3000});
      }

    });
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);
    }

}
