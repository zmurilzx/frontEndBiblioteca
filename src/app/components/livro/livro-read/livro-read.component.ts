import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { EmprestimoService } from '../../emprestimo/emprestimo.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {
  displayedColumns = ['id','titulo','autor','isbn','anoPublicacao','estoque','emprestimo','action'];
  dataSource = new MatTableDataSource<Livro>([]);
  emprestimos: Record<number, string> = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly filterKey = 'livro-read.search';

  constructor(private livroService: LivroService, private emprestimoService: EmprestimoService) {}

  ngOnInit(): void {
    this.livroService.read().subscribe(livro => {
      this.dataSource.data = livro;
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
      this.restoreFilter();
    });
    this.emprestimoService.read('ATIVO').subscribe(list => {
      const map: Record<number, string> = {};
      for (const e of list as any[]) {
        if (e?.livroId != null) map[e.livroId] = e?.clienteNome || '—';
      }
      this.emprestimos = map;
    });
  }

  applyFilter(value: string): void {
    this.dataSource.filter = (value || '').trim().toLowerCase();
    try { localStorage.setItem(this.filterKey, this.dataSource.filter); } catch {}
  }

  delete(row: Livro): void {
    const id: any = (row as any)?.id;
    const label = (row as any)?.titulo || id;
    if (id !== undefined && confirm('Excluir livro ' + label + '?')) {
      this.livroService.delete(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((i: any) => i.id !== id);
      });
    }
  }

  private restoreFilter(): void {
    try { const v = localStorage.getItem(this.filterKey); if (v) { this.dataSource.filter = v; } } catch {}
  }
}
