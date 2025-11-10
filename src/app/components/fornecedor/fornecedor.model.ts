export interface Fornecedor {
  id?: number;
  nomeFantasia: string;
  cnpj: string;
  razaoSocial: string;
  telefone?: string;
  endereco?: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  contatoResponsavel?: string;
  ativo?: boolean;
  observacoes?: string;
  dataCadastro?: string;
}
