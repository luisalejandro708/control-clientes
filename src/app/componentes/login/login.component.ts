import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { timeout } from 'rxjs';
import { LoginService } from '../../Servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router,
              private flasMessages: FlashMessagesService,
              private LoginService: LoginService) { }

  ngOnInit(){
    this.LoginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  login(){
    this.LoginService.login(this.email, this.password)
      .then ( res => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.flasMessages.show(error.message),{
        cssClass: 'alert-danger', timeout: 4000 }
      });
  }

}
