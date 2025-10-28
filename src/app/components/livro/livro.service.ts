import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Livro } from './livro.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: string = `${environment.apiUrl}/livros`;

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

  readById(liId: string): Observable<Livro> {
    const url = `${this.baseUrl}/${liId}`;
    return this.http.get<Livro>(url);
  }

  update(livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/${livro.liId}`;
    return this.http.put<Livro>(url, livro);
  }

  delete(liId: number): Observable<Livro> {
    const url = `${this.baseUrl}/${liId}`;
    return this.http.delete<Livro>(url);
  }
  
}
