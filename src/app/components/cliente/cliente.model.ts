export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email?: string;
  telefone?: string;
  rg?: string;
  sexo?: string;
  dataNascimento?: string;
  ativo?: boolean;
  observacoes?: string;
}
