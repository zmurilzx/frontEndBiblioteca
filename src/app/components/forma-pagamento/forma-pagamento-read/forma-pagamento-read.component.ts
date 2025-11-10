import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormaPagamento } from '../forma-pagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';

@Component({
  selector: 'app-forma-pagamento-read',
  templateUrl: './forma-pagamento-read.component.html',
  styleUrls: ['./forma-pagamento-read.component.css']
})
export class FormaPagamentoReadComponent implements OnInit {
  displayedColumns = ['id','descricao','tipo','numeroParcelas','diasEntreParcelas','permiteTroco','taxaPercentual','ativo','action'];
  dataSource = new MatTableDataSource<FormaPagamento>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly filterKey = 'forma-pagamento-read.search';

  constructor(private service: FormaPagamentoService) {}

  ngOnInit(): void {
    this.service.read().subscribe(list => {
      this.dataSource.data = list;
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
      this.restoreFilter();
    });
  }

  applyFilter(value: string): void {
    this.dataSource.filter = (value || '').trim().toLowerCase();
    try { localStorage.setItem(this.filterKey, this.dataSource.filter); } catch {}
  }

  delete(row: FormaPagamento): void {
    const id: any = (row as any)?.id;
    const label = (row as any)?.descricao || id;
    if (id !== undefined && confirm('Excluir forma de pagamento ' + label + '?')) {
      this.service.delete(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((i: any) => i.id !== id);
      });
    }
  }

  private restoreFilter(): void { try { const v = localStorage.getItem(this.filterKey); if (v) { this.dataSource.filter = v; } } catch {} }
}
