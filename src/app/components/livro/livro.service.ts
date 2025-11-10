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
    const payload: any = { ...livro };
    if (payload && (payload.id === 0 || payload.id === undefined)) delete payload.id;
    return this.http.post<Livro>(this.baseUrl, payload);
  }

  read(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.baseUrl);
  }

  readById(id: number): Observable<Livro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Livro>(url);
  }

  update(livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/${livro.id}`;
    return this.http.put<Livro>(url, livro);
  }

  delete(id: number): Observable<Livro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Livro>(url);
  }
  
}

