import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {
  livro: Livro | null = null;
  isSaving = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: LivroService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.service.readById(Number(id)).subscribe(l => (this.livro = l));
  }

  save(): void {
    if (!this.livro || this.isSaving) return;
    this.isSaving = true;
    this.service.update(this.livro).subscribe({
      next: () => { this.service.showMessage('Livro atualizado!'); this.router.navigate(['/livro']); },
      error: () => { this.service.showMessage('Não foi possível atualizar.'); this.isSaving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/livro']); }
}
