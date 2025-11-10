import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Emprestimo } from '../emprestimo.model';
import { EmprestimoService } from '../emprestimo.service';
import { ClienteService } from '../../cliente/cliente.service';
import { LivroService } from '../../livro/livro.service';

@Component({
  selector: 'app-emprestimo-create',
  templateUrl: './emprestimo-create.component.html',
  styleUrls: ['./emprestimo-create.component.css']
})
export class EmprestimoCreateComponent {
  form: Partial<Emprestimo> = {
    clienteId: undefined as any,
    livroId: undefined as any,
    dataDevolucaoPrevista: ''
  };
  isSaving = false;
  clientes$ = this.clienteService.read();
  livros$ = this.livroService.read();

  constructor(private service: EmprestimoService, private clienteService: ClienteService, private livroService: LivroService, private router: Router) {}

  save(): void {
    if (this.isSaving) return;
    if (!this.form.clienteId || !this.form.livroId || !this.form.dataDevolucaoPrevista) return;
    this.isSaving = true;
    this.service.registrar(this.form as Emprestimo).subscribe({
      next: () => { this.service.showMessage('Empréstimo registrado!'); this.router.navigate(['/emprestimos']); },
      error: () => { this.service.showMessage('Não foi possível registrar.'); this.isSaving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/emprestimos']); }
}

