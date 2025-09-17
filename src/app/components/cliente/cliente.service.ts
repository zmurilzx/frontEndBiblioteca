import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: string = "http://localhost:8080/cliente";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  read(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  readById(proId: string): Observable<Cliente> {
    const url = `${this.baseUrl}/${proId}`;
    return this.http.get<Cliente>(url);
  }

  update(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/${cliente.proId}`;
    return this.http.put<Cliente>(url, cliente);
  }

  delete(proId: number): Observable<Cliente> {
    const url = `${this.baseUrl}/${proId}`;
    return this.http.delete<Cliente>(url);
  }
}
