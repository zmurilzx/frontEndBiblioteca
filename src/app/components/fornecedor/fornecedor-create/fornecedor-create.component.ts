import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  fornecedor: Fornecedor = {
    fId: 0,
    NomeFantasia: '',
    Cnpj: '',
    RazaoSocial: ''
  };

  isSaving = false;

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  createFornecedor(): void {
    if (this.isSaving) { return; }
    this.isSaving = true;
    this.fornecedorService.create(this.fornecedor).subscribe({
      next: () => {
        this.fornecedorService.showMessage('Fornecedor cadastrado com sucesso!');
        this.router.navigate(['/fornecedor']);
      },
      error: () => {
        this.fornecedorService.showMessage('Não foi possível cadastrar o fornecedor.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fornecedor']);
  }
}
