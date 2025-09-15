import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto = {
    nome: '',
    descricao: '',
    codigo_barras: '',
    referencia: '',
    unidade_medida: '',
    marca: '',
    categoria: '',
    preco_custo: null,
    preco_venda: null,
    estoque_atual: null,
    estoque_minimo: null,
    estoque_maximo: null,
    localizacao: '', // << Adicione esta linha
    data_validade: null, // << Adicione esta linha
    fornecedor_id: null, // << Adicione esta linha
    ativo: null, // << Adicione esta linha
    data_cadastro: null, // << Adicione esta linha
    observacoes: '' // << Adicione esta linha
  };

  constructor() { }

  ngOnInit(): void {
  }

  createProduto(): void {
    // Lógica para criar o produto
    console.log(this.produto);
  }

  cancel(): void {
    // Lógica para cancelar
    console.log('Cancelado');
  }
}