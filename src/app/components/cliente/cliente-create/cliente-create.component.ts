import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';
import { CepService, CepResponse } from '../../../core/cep.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
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

  // Captura endereço opcional (CEP, rua, número, cidade, UF)
  enderecoVM: { cep?: string; rua?: string; numero?: number; cidade?: string; estado?: string } = {
    cep: '',
    rua: '',
    numero: undefined,
    cidade: '',
    estado: ''
  };

  isSaving = false;

  constructor(
    private clienteService: ClienteService,
    private cepService: CepService,
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

  onCepBlur(): void {
    const cepDigits = (this.enderecoVM.cep || '').replace(/\D/g, '');
    if (cepDigits.length !== 8) { return; }
    this.cepService.buscarPorCep(cepDigits).subscribe({
      next: (res: CepResponse) => {
        if ((res as any).erro) {
          this.clienteService.showMessage('CEP não encontrado.');
          return;
        }
        this.enderecoVM.rua = res.logradouro || this.enderecoVM.rua;
        this.enderecoVM.cidade = res.localidade || this.enderecoVM.cidade;
        this.enderecoVM.estado = (res.uf || this.enderecoVM.estado || '').toUpperCase();
      },
      error: () => {
        this.clienteService.showMessage('Falha ao consultar CEP.');
      }
    });
  }
}

