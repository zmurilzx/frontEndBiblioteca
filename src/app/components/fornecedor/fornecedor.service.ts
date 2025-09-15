import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  baseUrl: string = "http://localhost:8080/formapagamento";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.baseUrl, fornecedor);
  }

  read(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseUrl);
  }

  readById(proId: string): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${proId}`;
    return this.http.get<Fornecedor>(url);
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${fornecedor.proId}`;
    return this.http.put<Fornecedor>(url, fornecedor);
  }

  delete(proId: number): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${proId}`;
    return this.http.delete<Fornecedor>(url);
  }
}
