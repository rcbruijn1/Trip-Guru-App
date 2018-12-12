import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService} from '../../services/validate.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private authService: AuthService, private flashMessage:FlashMessagesService, private router : Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    
    //Validate fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Please fill in all the fields", {cssClass: 'alert-danger', timeout: 3000}); 
      return false;
    }

    //Validate email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please fill in a valid email-adress", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    //Authenticate user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show("You are successfuly registered!", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/user/login']);
        
      } else {
        this.flashMessage.show("Something went wrong!", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/user/register']);
        
      }
    });
  }

}
