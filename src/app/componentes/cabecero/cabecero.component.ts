import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Servicios/login.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { ConfiguracionServicio } from 'src/app/Servicios/configuracion.service';
import { Configuracion } from '../../Modelo/configuracion.model';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string | null;
  permitirRegistro: boolean;

  constructor(private LoginService: LoginService,
              private router: Router,
              private configuracionServicio: ConfiguracionServicio
  ) { }

  ngOnInit(){
    this.LoginService.getAuth().subscribe ( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLoggedIn = false;
      }
    })

    this.configuracionServicio.getConfiguracion().subscribe( configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro as any;
    })
  }

  logout(){
    this.LoginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']); 
  }

}
