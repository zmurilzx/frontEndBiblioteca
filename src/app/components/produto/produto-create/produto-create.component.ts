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
nome:'',
descricao:'',
codigo_barras:'',
referencia:'',
unidade_medida:'',
marca:'',
categoria:'',
preco_custo:'',
preco_venda:'',
estoque_atual:'',
estoque_minimo:'',
estoque_maximo:'',
localizacao:'',
data_validade:'',
fornecedor_id: undefined,
ativo:'',
data_cadastro:'',
observacoes:'',
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