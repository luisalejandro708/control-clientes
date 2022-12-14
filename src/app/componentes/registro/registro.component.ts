import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { LoginService } from '../../Servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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

    registro(){
      this.LoginService.registrarse(this.email, this.password)
       .then (res => {
        this.router.navigate(['/']);
       })
       .catch( error => {
        this.flasMessages.show( error.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
       });
    }
}
