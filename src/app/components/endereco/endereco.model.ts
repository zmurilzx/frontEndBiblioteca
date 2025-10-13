export interface Endereco {
    id?: number;
    clienteId?: number;
    rua: string;
    numero?: number;
    cidade: string;
    estado: string;
    cep: string;
    ativo?: boolean;
  }