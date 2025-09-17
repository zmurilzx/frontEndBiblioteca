import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente = {
    proCliNome: '',
    proCliCpf: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  createCliente(): void {

    console.log(this.cliente);
  }

  cancel(): void {
 
    console.log('Cancelado');
  }
}
