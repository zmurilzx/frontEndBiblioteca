import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../fornecedor/fornecedor.model';
import { ProdutoService } from '../produto.service';
import { FornecedorService } from '../../fornecedor/fornecedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto = {
proId: '',
proNome:'',
proDescricao:'',
proCodigo_barras:'',
proReferencia:'',
proUnidade_medida:'',
proMarca:'',
proCategoria:'',
proPreco_custo:'',
proPreco_venda:'',
proEstoque_atual:'',
proEstoque_minimo:'',
proEstoque_maximo:'',
proLocalizacao:'',
proData_validade:'',
proFornecedor_id: undefined,
proAtivo:'',
proData_cadastro:'',
proObservacoes:'',
  };

  fornecedor: Fornecedor[] = [];

  constructor(private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private router: Router) { }

  ngOnInit(): void {
    this.fornecedorService.read().subscribe(fornecedor => {
      this.fornecedor = fornecedor
    }
    )
  }

  createProduto(): void {
    console.log(this.produto);
  }

  cancel(): void {
    // Lógica para cancelar
    console.log('Cancelado');
  }
}