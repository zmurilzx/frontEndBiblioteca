import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto.model';
import { Fornecedor } from '../../fornecedor/fornecedor.model';
import { FornecedorService } from '../../fornecedor/fornecedor.service';

interface ProdutoForm {
  proId?: number;
  proNome: string;
  proDescricao: string;
  proCodigoBarras?: string;
  proReferencia?: string;
  proUnidadeMedida?: string;
  proMarca?: string;
  proCategoria?: string;
  proPrecoCusto?: number | null;
  proPrecoVenda?: number | null;
  proEstoqueAtual?: number | null;
  proEstoqueMinimo?: number | null;
  proEstoqueMaximo?: number | null;
  proLocalizacao?: string;
  proData_validade?: string;
  fornecedor?: Fornecedor | null;
  proAtivo: boolean;
  proData_cadastro?: string;
  proObservacoes?: string;
}

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: ProdutoForm = {
    proNome: '',
    proDescricao: '',
    proCodigoBarras: '',
    proReferencia: '',
    proUnidadeMedida: '',
    proMarca: '',
    proCategoria: '',
    proPrecoCusto: null,
    proPrecoVenda: null,
    proEstoqueAtual: null,
    proEstoqueMinimo: null,
    proEstoqueMaximo: null,
    proLocalizacao: '',
    proData_validade: '',
    fornecedor: null,
    proAtivo: true,
    proData_cadastro: '',
    proObservacoes: ''
  };

  fornecedores: Fornecedor[] = [];
  isSaving = false;

  constructor(
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fornecedorService.read().subscribe(fornecedores => {
      this.fornecedores = fornecedores;
    });
  }

  createProduto(): void {
    if (this.isSaving) { return; }

    if (!this.produto.proNome.trim()) {
      this.produtoService.showMessage('Informe o nome do produto.');
      return;
    }

    const payload: Produto = {
      proId: this.produto.proId ?? 0,
      proNome: this.produto.proNome.trim(),
      proDescricao: this.produto.proDescricao?.trim() ?? '',
      proCodigoBarras: this.produto.proCodigoBarras?.trim(),
      proReferencia: this.produto.proReferencia?.trim(),
      proUnidadeMedida: this.produto.proUnidadeMedida?.trim(),
      proMarca: this.produto.proMarca?.trim(),
      proCategoria: this.produto.proCategoria?.trim(),
      proPrecoCusto: this.toNumber(this.produto.proPrecoCusto),
      proPrecoVenda: this.toNumber(this.produto.proPrecoVenda),
      proEstoqueAtual: this.toNumber(this.produto.proEstoqueAtual),
      proEstoqueMinimo: this.toNumber(this.produto.proEstoqueMinimo),
      proEstoqueMaximo: this.toNumber(this.produto.proEstoqueMaximo),
      proLocalizacao: this.produto.proLocalizacao?.trim(),
      proData_validade: this.produto.proData_validade || undefined,
      fornecedor: this.produto.fornecedor ?? undefined,
      proAtivo: this.produto.proAtivo,
      proData_cadastro: this.produto.proData_cadastro || undefined,
      proObservacoes: this.produto.proObservacoes?.trim()
    };

    this.isSaving = true;
    this.produtoService.create(payload).subscribe({
      next: () => {
        this.produtoService.showMessage('Produto cadastrado com sucesso!');
        this.router.navigate(['/produto']);
      },
      error: () => {
        this.produtoService.showMessage('Não foi possível cadastrar o produto.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/produto']);
  }

  private toNumber(value: number | string | null | undefined): number | undefined {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }
    const normalized = typeof value === 'string' ? value.replace(/,/g, '.').trim() : value;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
}
