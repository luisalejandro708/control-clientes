import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientesServicio } from '../../Servicios/cliente.service';
import { Cliente } from '../../Modelo/cliente.model';
import { FlashMessagesService } from 'flash-messages-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente={
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private ClientesServicio: ClientesServicio,
              private flashMessages: FlashMessagesService      
    ) { }

  ngOnInit() {
    this.ClientesServicio.getClientes(). subscribe(
      clientes => {
         this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach( cliente =>{
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  agregar(f:NgForm){
    console.log(f.value)
    if(!f.valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      })
    }
    else{
      //Agregar nuevo cliente
      this.ClientesServicio.agregarCliente(this.cliente);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}


