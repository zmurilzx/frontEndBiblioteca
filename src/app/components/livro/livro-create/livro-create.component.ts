import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livro = {
    LiFornecedor: '',
    LiNome: '',
    LiDescricao: '',
    LiAvaliacao:'',
    LiNumeropagi:'',
    LiIdioma:'',
    LiDataPubli:'',
    LiDimensoes:'',
    LiAutor:''
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