import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: string = "http://localhost:8080/livro";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(livro: livro): Observable<livro> {
    return this.http.post<livro>(this.baseUrl, livro);
  }

  read(): Observable<livro[]> {
    return this.http.get<livro[]>(this.baseUrl);
  }

  readById(proId: string): Observable<livro> {
    const url = `${this.baseUrl}/${proId}`;
    return this.http.get<livro>(url);
  }

  update(livro: livro): Observable<livro> {
    const url = `${this.baseUrl}/${livro.proId}`;
    return this.http.put<livro>(url, livro);
  }

  delete(proId: number): Observable<livro> {
    const url = `${this.baseUrl}/${proId}`;
    return this.http.delete<livro>(url);
  }
}
