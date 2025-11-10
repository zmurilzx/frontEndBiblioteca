export interface FormaPagamento {
  id: number;
  descricao: string;
  tipo: string;
  numeroParcelas?: number;
  diasEntreParcelas: number;
  permiteTroco: boolean;
  taxaPercentual?: number;
  ativo: boolean;
}
