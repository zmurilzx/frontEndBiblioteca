import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormaPagamento } from '../forma-pagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';

@Component({  // <<< ESSENCIAL
  selector: 'app-forma-pagamento-create',
  templateUrl: './forma-pagamento-create.component.html',
  styleUrls: ['./forma-pagamento-create.component.css']
})
export class FormaPagamentoCreateComponent {

  formaPagamento: FormaPagamento = {
    FId: 0,
    descricao: '',
    tipo: '',
    numeroParcelas: 0,
    diasEntreParcelas: 0,
    permiteTroco:  '',
    taxa_percentual: 0,
    ativo: ''
  };

  isSaving = false;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router
  ) {}

  createFormaPagamento(): void {
    if (this.isSaving) { return; }
    this.isSaving = true;
    this.formaPagamentoService.create(this.formaPagamento).subscribe({
      next: () => {
        this.formaPagamentoService.showMessage('Forma de pagamento criada!');
        this.router.navigate(['/fpagamentos']);
      },
      error: () => {
        this.formaPagamentoService.showMessage('Não foi possível criar a forma de pagamento.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

}
