import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../services/journey.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  journeys: any;
  cityId: string;
  cities: any;

  journey_name: string;
  journey_departure_date: Date;
  journey_return_date: Date;
  journey_description: string;



  constructor(private journeyService: JourneyService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.journeyService.getJourneys()
    .subscribe(res => {
      this.journeys = res;
      console.log(this.journeys);
      // Logt wel een object met daarin de cities, cities zijn niet zelf te loggen

    })

  }


  onJourneySubmit() {
    const new_journey = {
      name: this.journey_name,
      departure_date: this.journey_departure_date,
      return_date: this.journey_return_date,
      description: this.journey_description
    }

    this.journeyService.addJourney(new_journey).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Journey added!", {cssClass: 'alert-success', timeout: 3000});
} else {
        this.flashMessage.show("Failed to add!", {cssClass: 'alert-danger', timeout: 3000});
      }

    });
  }


  

}
