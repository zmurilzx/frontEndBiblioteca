import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FormaPagamento } from './formaPagamento.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  baseUrl: string = `${environment.apiUrl}/formas-pagamento`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    return this.http.post<FormaPagamento>(this.baseUrl, formaPagamento);
  }

  read(): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(this.baseUrl);
  }

  readById(FId: number): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/${FId}`;
    return this.http.get<FormaPagamento>(url);
  }

  update(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/${formaPagamento.FId}`;
    return this.http.put<FormaPagamento>(url, formaPagamento);
  }

  delete(FId: number): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/${FId}`;
    return this.http.delete<FormaPagamento>(url);
  }
}
