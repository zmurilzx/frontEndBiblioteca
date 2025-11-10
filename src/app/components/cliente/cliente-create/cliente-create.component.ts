import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    rg: '',
    sexo: 'OUTRO',
    dataNascimento: '',
    ativo: true,
    observacoes: ''
  };

  isSaving = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createCliente(): void {
    if (this.isSaving) { return; }
    this.isSaving = true;
    this.clienteService.create(this.cliente).subscribe({
      next: () => {
        this.clienteService.showMessage('Cliente cadastrado com sucesso!');
        this.router.navigate(['/cliente']);
      },
      error: () => {
        this.clienteService.showMessage('Não foi possível cadastrar o cliente.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/cliente']);
  }
}

