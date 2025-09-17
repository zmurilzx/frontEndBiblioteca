import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livro = {
    proLiFornecedor: '',
    proLiNome: '',
    proLiDescricao: '',
    proLiAvaliacao:'',
    proLiNumeropagi:'',
    proLiIdioma:'',
    proLiDataPubli:'',
    proLiDimensoes:'',
    proLiAutor:''
  };

  constructor() { }

  ngOnInit(): void {
  }

  createLivro(): void {
    console.log(this.livro);
  }

  cancel(): void {
    console.log('Cancelado');
  }
}