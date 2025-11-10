export interface Emprestimo {
  id: number;
  livroId: number;
  livroTitulo?: string;
  clienteId: number;
  clienteNome?: string;
  bibliotecarioResponsavel?: string;
  dataEmprestimo?: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal?: string;
  status?: 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO' | 'CANCELADO';
  multa?: number;
}

