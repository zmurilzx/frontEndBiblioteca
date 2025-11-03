import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { Fornecedor } from '../../fornecedor/fornecedor.model';
import { FornecedorService } from '../../fornecedor/fornecedor.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livro: Livro = {
    liId: 0,
    liNome: '',
    liDescricao: '',
    liAvaliacao: 0,
    liNumeropagi: 0,
    liIdioma: '',
    liDataPubli: new Date(),
    liDimensoes: '',
    liAutor: '',
    fornecedor_id: undefined,
  };

  fornecedor: Fornecedor[] = [];
  isSaving = false;

  constructor(
    private livroService: LivroService,
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedorService.read().subscribe(fornecedor => {
      this.fornecedor = fornecedor;
    });
  }

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
