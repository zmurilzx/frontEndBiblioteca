import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit {

  produto!: Produto[]
  displayedColumns = ['proId','proNome', 'proDescricao',  'proMarca','proPrecoVenda','proData_validade', 'proObservacoes', 'action']

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.read().subscribe(produto => {
      this.produto = produto
      console.log(produto)  
    })
  }

}