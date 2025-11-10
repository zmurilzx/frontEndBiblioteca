import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from '../endereco.model';
import { CepService, CepResponse } from '../../../core/cep.service';
import { EnderecoService } from '../endereco.service';

@Component({
  selector: 'app-endereco-create',
  templateUrl: './endereco-create.component.html',
  styleUrls: ['./endereco-create.component.css']
})
export class EnderecoCreateComponent implements OnInit {
  endereco: Endereco = {
    clienteId: undefined,
    rua: '',
    numero: undefined,
    cidade: '',
    estado: '',
    cep: '',
    ativo: true
  };

  isSaving = false;

  constructor(
    private enderecoService: EnderecoService,
    private cepService: CepService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createEndereco(): void {
    if (this.isSaving) { return; }

    if (!this.endereco.clienteId || !this.endereco.rua?.trim() || !this.endereco.cidade?.trim() || !this.endereco.estado?.trim()) {
      this.enderecoService.showMessage('Preencha os campos obrigatórios.');
      return;
    }

    this.isSaving = true;
    this.enderecoService.create(this.endereco).subscribe({
      next: () => {
        this.enderecoService.showMessage('Endereço cadastrado com sucesso!');
        this.router.navigate(['/cliente']);
      },
      error: () => {
        this.enderecoService.showMessage('Não foi possível cadastrar o endereço.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/cliente']);
  }

  onCepBlur(): void {
    const cepDigits = (this.endereco.cep || '').replace(/\D/g, '');
    if (cepDigits.length !== 8) { return; }
    this.cepService.buscarPorCep(cepDigits).subscribe({
      next: (res: CepResponse) => {
        if ((res as any).erro) {
          this.enderecoService.showMessage('CEP não encontrado.');
          return;
        }
        this.endereco.rua = res.logradouro || this.endereco.rua;
        this.endereco.cidade = res.localidade || this.endereco.cidade;
        this.endereco.estado = (res.uf || this.endereco.estado || '').toUpperCase();
      },
      error: () => {
        this.enderecoService.showMessage('Falha ao consultar CEP.');
      }
    });
  }
}
