import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-read',
  templateUrl: './fornecedor-read.component.html',
  styleUrls: ['./fornecedor-read.component.css']
})
export class FornecedorReadComponent implements OnInit {
  displayedColumns = ['id','nomeFantasia','cnpj','razaoSocial','telefone','ativo','action'];
  dataSource = new MatTableDataSource<Fornecedor>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly filterKey = 'fornecedor-read.search';

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.fornecedorService.read().subscribe(fornecedor => {
      this.dataSource.data = fornecedor;
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
      this.restoreFilter();
    });
  }

  delete(row: Fornecedor): void {
    const id: any = (row as any)?.id;
    const label = (row as any)?.nomeFantasia || (row as any)?.razaoSocial || id;
    if (id !== undefined && confirm('Excluir fornecedor ' + label + '?')) {
      this.fornecedorService.delete(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((i: any) => i.id !== id);
      });
    }
  }

  applyFilter(value: string): void {
    this.dataSource.filter = (value || '').trim().toLowerCase();
    try { localStorage.setItem(this.filterKey, this.dataSource.filter); } catch {}
  }

  private restoreFilter(): void { try { const v = localStorage.getItem(this.filterKey); if (v) { this.dataSource.filter = v; } } catch {} }
}
