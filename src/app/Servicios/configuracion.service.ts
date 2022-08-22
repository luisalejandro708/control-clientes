import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Configuracion } from '../Modelo/configuracion.model';

@Injectable()

export class ConfiguracionServicio {
    configuracionDoc: AngularFirestoreDocument<Configuracion>;
    configuracion: Observable<Configuracion>;

    //id valor de la configuracion de configuración
    id = '1';

    constructor(private db: AngularFirestore){}

    getConfiguracion(): Observable<Configuracion> {
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configuracionDoc.valueChanges() as any;
        return this.configuracion;
    }
    
    modificarConfiguracion(configuracion: Configuracion){
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }
}