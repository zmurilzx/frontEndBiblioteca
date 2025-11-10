export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  editora?: string;
  anoPublicacao?: number;
  estoque?: number;
}
