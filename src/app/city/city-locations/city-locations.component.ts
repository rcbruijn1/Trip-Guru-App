import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-city-locations',
  templateUrl: './city-locations.component.html',
  styleUrls: ['./city-locations.component.css']
})
export class CityLocationsComponent implements OnInit {
  @Input() city;

  locations : any;

  constructor() { }

  ngOnInit() {
    console.log(this.city);
    this.locations = this.city.locations;
    console.log(this.locations);

    }

  }

  


