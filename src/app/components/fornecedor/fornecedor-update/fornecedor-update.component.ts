import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {
  fornecedor: Fornecedor | null = null;
  isSaving = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: FornecedorService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.service.readById(Number(id)).subscribe(f => (this.fornecedor = f));
  }

  save(): void {
    if (!this.fornecedor || this.isSaving) return;
    this.isSaving = true;
    this.service.update(this.fornecedor).subscribe({
      next: () => { this.service.showMessage('Fornecedor atualizado!'); this.router.navigate(['/fornecedor']); },
      error: () => { this.service.showMessage('Não foi possível atualizar.'); this.isSaving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/fornecedor']); }
}
