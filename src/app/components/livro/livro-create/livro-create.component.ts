import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livro: Livro = {
    id: 0,
    titulo: '',
    autor: '',
    isbn: '',
    editora: '',
    anoPublicacao: undefined,
    estoque: 0
  };

  isSaving = false;

  constructor(
    private livroService: LivroService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createLivro(): void {
    if (this.isSaving) { return; }
    this.isSaving = true;
    this.livroService.create(this.livro).subscribe({
      next: () => {
        this.livroService.showMessage('Livro cadastrado com sucesso!');
        this.router.navigate(['/livro']);
      },
      error: () => {
        this.livroService.showMessage('Não foi possível cadastrar o livro.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/livro']);
  }
}
