import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';
import { CepService, CepResponse } from '../../../core/cep.service';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  fornecedor: Fornecedor = {
    nomeFantasia: '',
    cnpj: '',
    razaoSocial: '',
    telefone: '',
    endereco: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    contatoResponsavel: '',
    ativo: true,
    observacoes: ''
  };

  // Campos estruturados de endereço para capturar CEP etc.
  enderecoVM: { cep?: string; rua?: string; numero?: number; cidade?: string; estado?: string } = {
    cep: '',
    rua: '',
    numero: undefined,
    cidade: '',
    estado: ''
  };

  isSaving = false;
  isCepLoading = false;

  constructor(
    private fornecedorService: FornecedorService,
    private cepService: CepService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  createFornecedor(): void {
    if (this.isSaving) { return; }
    // Se o endereço estruturado foi preenchido, monta string única para compatibilidade
    const hasEndereco = (this.enderecoVM.cep || this.enderecoVM.rua || this.enderecoVM.numero || this.enderecoVM.cidade || this.enderecoVM.estado);
    if (hasEndereco) {
      const cep = this.enderecoVM.cep ? `CEP ${this.enderecoVM.cep}` : '';
      const ruaNumero = [this.enderecoVM.rua || '', this.enderecoVM.numero != null ? `${this.enderecoVM.numero}` : '']
        .filter(Boolean)
        .join(', ');
      const cidadeUf = [this.enderecoVM.cidade || '', this.enderecoVM.estado || ''].filter(Boolean).join('/');
      const parts = [ruaNumero, cidadeUf, cep].filter(p => p && p.trim().length);
      const enderecoStr = parts.join(' - ');
      if (enderecoStr) {
        this.fornecedor.endereco = enderecoStr;
      }
    }
    this.isSaving = true;
    this.fornecedorService.create(this.fornecedor).subscribe({
      next: () => {
        this.fornecedorService.showMessage('Fornecedor cadastrado com sucesso!');
        this.router.navigate(['/fornecedor']);
      },
      error: () => {
        this.fornecedorService.showMessage('Não foi possível cadastrar o fornecedor.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fornecedor']);
  }

  onCepBlur(): void {
    const cepDigits = (this.enderecoVM.cep || '').replace(/\D/g, '');
    if (cepDigits.length !== 8) { return; }
    this.isCepLoading = true;
    this.cepService.buscarPorCep(cepDigits).subscribe({
      next: (res: CepResponse) => {
        this.isCepLoading = false;
        if ((res as any).erro) {
          this.fornecedorService.showMessage('CEP não encontrado.');
          return;
        }
        this.enderecoVM.rua = res.logradouro || this.enderecoVM.rua;
        this.enderecoVM.cidade = res.localidade || this.enderecoVM.cidade;
        this.enderecoVM.estado = (res.uf || this.enderecoVM.estado || '').toUpperCase();
      },
      error: () => {
        this.isCepLoading = false;
        this.fornecedorService.showMessage('Falha ao consultar CEP.');
      }
    });
  }
}

