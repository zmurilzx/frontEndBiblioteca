import { Component, OnInit } from '@angular/core';

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
proFornecedor_id:'',
proAtivo:'',
proData_cadastro:'',
proObservacoes:'',
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