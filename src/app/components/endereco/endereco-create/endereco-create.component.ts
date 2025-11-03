import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from '../endereco.model';
import { EnderecoService } from '../endereco.service';

@Component({
  selector: 'app-endereco-create',
  templateUrl: './endereco-create.component.html',
  styleUrls: ['./endereco-create.component.css']
})
export class EnderecoCreateComponent implements OnInit {
  endereco: Endereco = {
    clienteId: undefined,
    rua: '',
    numero: undefined,
    cidade: '',
    estado: '',
    cep: '',
    ativo: true
  };

  isSaving = false;

  constructor(
    private enderecoService: EnderecoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createEndereco(): void {
    if (this.isSaving) { return; }

    if (!this.endereco.clienteId || !this.endereco.rua?.trim() || !this.endereco.cidade?.trim() || !this.endereco.estado?.trim()) {
      this.enderecoService.showMessage('Preencha os campos obrigatórios.');
      return;
    }

    this.isSaving = true;
    this.enderecoService.create(this.endereco).subscribe({
      next: () => {
        this.enderecoService.showMessage('Endereço cadastrado com sucesso!');
        this.router.navigate(['/cliente']);
      },
      error: () => {
        this.enderecoService.showMessage('Não foi possível cadastrar o endereço.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/cliente']);
  }
}
