import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  baseUrl: string = `${environment.apiUrl}/fornecedores`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    const payload: any = { ...fornecedor };
    if (payload && (payload.id === 0 || payload.id === undefined)) delete payload.id;
    return this.http.post<Fornecedor>(this.baseUrl, payload);
  }

  read(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseUrl);
  }

  readById(id: number): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Fornecedor>(url);
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${fornecedor.id}`;
    return this.http.put<Fornecedor>(url, fornecedor);
  }

  delete(id: number): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Fornecedor>(url);
  }
  
}


