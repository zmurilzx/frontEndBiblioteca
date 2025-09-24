import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Livro } from './livro.model';

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

  create(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.baseUrl, livro);
  }

  read(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.baseUrl);
  }

  readById(LiId: string): Observable<Livro> {
    const url = `${this.baseUrl}/${LiId}`;
    return this.http.get<Livro>(url);
  }

  update(livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/${livro.LiId}`;
    return this.http.put<Livro>(url, livro);
  }

  delete(LiId: number): Observable<Livro> {
    const url = `${this.baseUrl}/${LiId}`;
    return this.http.delete<Livro>(url);
  }
  
}
