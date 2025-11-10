import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Emprestimo } from './emprestimo.model';

@Injectable({ providedIn: 'root' })
export class EmprestimoService {
  baseUrl = `${environment.apiUrl}/emprestimos`;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  showMessage(msg: string): void {
    this.snack.open(msg, 'X', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
  }

  read(status?: string): Observable<Emprestimo[]> {
    const url = status ? `${this.baseUrl}?status=${encodeURIComponent(status)}` : this.baseUrl;
    return this.http.get<Emprestimo[]>(url);
  }

  readByCliente(clienteId: number, apenasAtivos = false): Observable<Emprestimo[]> {
    const url = `${this.baseUrl}/cliente/${clienteId}?apenasAtivos=${apenasAtivos}`;
    return this.http.get<Emprestimo[]>(url);
  }

  registrar(dto: Emprestimo): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.baseUrl, dto);
  }

  registrarDevolucao(id: number, data: string): Observable<Emprestimo> {
    const url = `${this.baseUrl}/${id}/devolucao`;
    return this.http.patch<Emprestimo>(url, { dataDevolucaoReal: data });
  }
}
