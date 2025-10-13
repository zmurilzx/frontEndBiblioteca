import { Fornecedor } from "../fornecedor/fornecedor.model";

export interface Livro {
  liId: number;
  fornecedor_id?: Fornecedor;
  liNome: string;
  liDescricao: string;
  liAvaliacao: number;
  liNumeropagi: number;
  liIdioma: string;
  liDataPubli: Date;
  liDimensoes: string;
  liAutor: string;
}
