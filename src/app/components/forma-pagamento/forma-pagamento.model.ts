export interface FormaPagamento {
  FId: number;
  descricao: string;
  tipo: string;
  numeroParcelas: number;
  diasEntreParcelas: number;
  permiteTroco: string;
  taxa_percentual: number;
  ativo: string;
}
