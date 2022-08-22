import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService{
    constructor(private authService: AngularFireAuth){}

    //el usuario pueda hacer login

    login(email: string, password: string){
        return new Promise((resolve, reject) => {
            this.authService.signInWithEmailAndPassword(email, password)
            .then(datos => resolve(datos), 
                error => reject(error)
            )
        })
    }
    
    // nos regresa el usuario que esta autenticado en la Base de datos
    getAuth(){
        return this.authService.authState.pipe(
            map( auth => auth )
        )
    }
     
    //el usuario pueda salir del login
    logout(){
        this.authService.signOut();
    }
    
    //Se registra el usuario
    registrarse(email: string, password: string) {
        return new Promise ((resolve, reject) => {
            this.authService.createUserWithEmailAndPassword(email, password)
             .then(datos => resolve(datos),
             error => reject (error));
        })
    }
}