import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CepResponse {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string; // cidade
  uf?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CepService {
  constructor(private http: HttpClient) {}

  buscarPorCep(cep: string): Observable<CepResponse> {
    const digits = (cep || '').replace(/\D/g, '');
    return this.http.get<CepResponse>(`https://viacep.com.br/ws/${digits}/json/`);
  }
}

