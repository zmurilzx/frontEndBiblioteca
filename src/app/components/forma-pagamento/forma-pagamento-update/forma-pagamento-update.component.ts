import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPagamento } from '../forma-pagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';

@Component({
  selector: 'app-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html',
  styleUrls: ['./forma-pagamento-update.component.css']
})
export class FormaPagamentoUpdateComponent implements OnInit {
  formaPagamento: FormaPagamento | null = null;
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FormaPagamentoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.service.readById(Number(id)).subscribe(fp => (this.formaPagamento = fp));
  }

  save(): void {
    if (!this.formaPagamento || this.isSaving) return;
    this.isSaving = true;
    this.service.update(this.formaPagamento).subscribe({
      next: () => { this.service.showMessage('Forma de pagamento atualizada!'); this.router.navigate(['/fpagamentos']); },
      error: () => { this.service.showMessage('Não foi possível atualizar.'); this.isSaving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/fpagamentos']); }
}

