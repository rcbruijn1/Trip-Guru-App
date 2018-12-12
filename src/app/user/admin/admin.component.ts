import { Component, OnInit } from '@angular/core';
import { CityLocationService } from '../../services/city-location.service';
import { CityService} from '../../services/city.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [CityLocationService]
})
export class AdminComponent implements OnInit {
  locations: any;
  cities: any;
  
  cityId: string;
  city_name: string;
  city_country: String;
  city_description: String;
  city_imagePath: String;
  locationId: string;

  location_name: String;
  location_description: String;
  location_imagePath: String;


  constructor(private cityLocationService: CityLocationService, private cityService: CityService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.cityLocationService.getLocations()
      .subscribe(res => {
        this.locations = res;
        console.log(res)
      })

      this.cityService.getCities()
      .subscribe(res => {
        this.cities = res;
        console.log(res)
      })
  }

  onLocationSubmit() {
    const new_location = {
      name: this.location_name,
      description: this.location_description,
      imagePath: this.location_imagePath
    }

    this.cityLocationService.addLocation(new_location).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Location added!", {cssClass: 'alert-success', timeout: 3000});
        this.cityLocationService.getLocations()
      .subscribe(res => {
        this.locations = res;
      })} else {
        this.flashMessage.show("Failed to add!", {cssClass: 'alert-danger', timeout: 3000});
      }

    });
  }

    onCitySubmit() {
      const new_city = {
        name: this.city_name,
        country: this.city_country,
        description: this.city_description,
        imagePath: this.city_imagePath
      }
  
      this.cityService.addCity(new_city).subscribe(data => {
        if (data.success) {
          this.flashMessage.show("City added!", {cssClass: 'alert-success', timeout: 3000});
          this.cityService.getCities()
        .subscribe(res => {
          this.cities = res;
        })} else {
          this.flashMessage.show("Failed to add!", {cssClass: 'alert-danger', timeout: 3000});
        }
  
      });
    }

    onSelectLocation(event) {
      this.locationId = event.target.value;
      
    }

    onSelectCity(event) {
      this.cityId = event.target.value;
      console.log(this.cityId);
    }

    onLocationAdded() {
      const location = {
        _id: this.locationId
      }
      this.cityService.addLocationById(this.cityId,location).subscribe(data => {
        if (data) {
          this.flashMessage.show("Location added!", {cssClass: 'alert-success', timeout: 3000});
        }else{
          this.flashMessage.show("Failed to add!", {cssClass: 'alert-danger', timeout: 3000});
        }
  
      });
    }

    removeCityById(){
      console.log(this.cityId);
      this.cityService.deleteCity(this.cityId).subscribe(data => {
        if (data) {
          this.flashMessage.show("City removed!", {cssClass: 'alert-success', timeout: 3000});
          this.cityService.getCities()
          .subscribe(res => {
            this.cities = res;
          })
        }
  
      });
    }

    removeLocationById(){
      console.log(this.locationId);
      this.cityLocationService.deleteLocation(this.locationId).subscribe(data => {
        if (data) {
          this.flashMessage.show("Location removed!", {cssClass: 'alert-success', timeout: 3000});
          this.cityLocationService.getLocations()
          .subscribe(res => {
            this.locations = res;
          })
        }
  
      });
    }
  }
