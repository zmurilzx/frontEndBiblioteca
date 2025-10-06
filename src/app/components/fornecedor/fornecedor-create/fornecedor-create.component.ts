import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  fornecedor = {
    NomeFantasia: '',
    Cnpj: '',
    RazaoSocial: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  createFornecedor(): void {
    // Lógica para criar o fornecedor
    console.log(this.fornecedor);
  }

  cancel(): void {
    // Lógica para cancelar
    console.log('Cancelado');
  }
}