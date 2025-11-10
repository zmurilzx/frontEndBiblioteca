import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  cliente: Cliente | null = null;
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteService.readById(Number(id)).subscribe(c => (this.cliente = c));
    }
  }

  save(): void {
    if (!this.cliente || this.isSaving) return;
    this.isSaving = true;
    this.clienteService.update(this.cliente).subscribe({
      next: () => {
        this.clienteService.showMessage('Cliente atualizado!');
        this.router.navigate(['/cliente']);
      },
      error: () => {
        this.clienteService.showMessage('Não foi possível atualizar.');
        this.isSaving = false;
      }
    });
  }

  cancel(): void { this.router.navigate(['/cliente']); }
}
