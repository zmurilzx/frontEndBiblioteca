import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snack: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Falha ao comunicar com o servidor.';
        if (error.error && typeof error.error === 'string') {
          message = error.error;
        } else if (error.error && error.error.message) {
          message = error.error.message;
        } else if (error.status) {
          switch (error.status) {
            case 0: message = 'Servidor indisponível.'; break;
            case 400: message = 'Requisição inválida.'; break;
            case 401: message = 'Sessão expirada ou não autorizada.'; break;
            case 404: message = 'Recurso não encontrado.'; break;
            case 409: message = 'Conflito de dados.'; break;
            default: message = 'Erro inesperado. Tente novamente.'; break;
          }
        }
        this.snack.open(message, 'OK', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' });
        return throwError(() => error);
      })
    );
  }
}

