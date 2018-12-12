import { Component, OnInit } from '@angular/core';

import { CityService} from '../services/city.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css'],
  providers: [CityService]
})
export class DiscoveryComponent implements OnInit {
  cities: any;

  constructor(private cityService : CityService) { }

  ngOnInit() {
    this.cityService.getCities()
    .subscribe(res => {
      this.cities = res;
      console.log(res)
    })
  }

}
