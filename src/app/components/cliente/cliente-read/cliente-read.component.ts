import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {
  displayedColumns: string[] = ['id','cpf','nome','email','telefone','ativo','action'];
  dataSource = new MatTableDataSource<Cliente>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly filterKey = 'cliente-read.search';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.read().subscribe(cliente => {
      this.dataSource.data = cliente;
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
      this.restoreFilter();
    });
  }

  applyFilter(value: string): void {
    this.dataSource.filter = (value || '').trim().toLowerCase();
    try { localStorage.setItem(this.filterKey, this.dataSource.filter); } catch {}
  }

  delete(row: Cliente): void {
    if (!row || (row as any).id === undefined) return;
    const label = (row as any).nome || (row as any).cpf || (row as any).id;
    if (confirm('Excluir cliente ' + label + '?')) {
      this.clienteService.delete((row as any).id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((i: any) => i.id !== (row as any).id);
      });
    }
  }

  private restoreFilter(): void {
    try { const v = localStorage.getItem(this.filterKey); if (v) { this.dataSource.filter = v; } } catch {}
  }
}
