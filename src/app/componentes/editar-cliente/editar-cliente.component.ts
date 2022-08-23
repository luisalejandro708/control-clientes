import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/Modelo/cliente.model';
import { ClientesServicio } from '../../Servicios/cliente.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente={
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id: string;

  constructor(private ClientesServicio: ClientesServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute
             ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.ClientesServicio.getCliente(this.id).subscribe (cliente => {
      this.cliente = cliente;
    });
  }

  guardar(f:NgForm){
    console.log(f.value)
    if(!f.valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      })
    }
    else{
      //modificar nuevo cliente
      this.ClientesServicio.modificarCliente(this.cliente);
      this.router.navigate(['/login']);
    }
  }

  eliminar(){
    if(confirm('¿Seguro que desea eliminar el cliente?')){
      this.ClientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/login']);
    }
  }
}
