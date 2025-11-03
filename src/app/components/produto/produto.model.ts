import { Fornecedor } from '../fornecedor/fornecedor.model';

export interface Produto {
  proId: number;
  proNome: string;
  proDescricao: string;
  proCodigoBarras?: string;
  proReferencia?: string;
  proUnidadeMedida?: string;
  proMarca?: string;
  proCategoria?: string;
  proPrecoCusto?: number;
  proPrecoVenda?: number;
  proEstoqueAtual?: number;
  proEstoqueMinimo?: number;
  proEstoqueMaximo?: number;
  proLocalizacao?: string;
  proData_validade?: string;
  fornecedor?: Fornecedor;
  proAtivo?: boolean;
  proData_cadastro?: string;
  proObservacoes?: string;
}
