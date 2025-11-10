import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Emprestimo } from '../emprestimo.model';
import { EmprestimoService } from '../emprestimo.service';

@Component({
  selector: "app-emprestimo-read",
  templateUrl: "./emprestimo-read.component.html",
  styleUrls: ["./emprestimo-read.component.css"],
})
export class EmprestimoReadComponent implements OnInit {
  displayedColumns = ["livro", "cliente", "datas", "status", "action"];
  dataSource = new MatTableDataSource<Emprestimo>([]);
  filtroStatus: string | undefined = "ATIVO";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly filterKey = 'emprestimo-read.search';

  constructor(private service: EmprestimoService) {}

  ngOnInit(): void { this.load(); this.restoreFilter(); }

  load(): void {
    this.service.read(this.filtroStatus).subscribe((list) => {
      this.dataSource.data = list;
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    });
  }

  applyFilter(value: string): void {
    this.dataSource.filter = (value || '').trim().toLowerCase();
    try { localStorage.setItem(this.filterKey, this.dataSource.filter); } catch {}
  }

  changeStatusFilter(status: string | undefined): void {
    this.filtroStatus = status;
    this.load();
  }

  marcarDevolvido(row: Emprestimo): void {
    const id: any = (row as any)?.id;
    if (id === undefined) return;
    const hoje = new Date();
    const data = hoje.toISOString().slice(0, 10);
    if (confirm("Marcar como devolvido?")) {
      this.service.registrarDevolucao(id, data).subscribe({
        next: () => {
          this.service.showMessage("Devolução registrada.");
          this.load();
        },
        error: () => this.service.showMessage("Não foi possível registrar a devolução."),
      });
    }
  }

  private restoreFilter(): void { try { const v = localStorage.getItem(this.filterKey); if (v) { this.dataSource.filter = v; } } catch {} }
}
