import { Fornecedor } from "../fornecedor/fornecedor.model"

export interface   Produto{
proId: number
nome:string
descricao:string
codigo_barras:number
referencia:string
unidade_medida:number
marca:string
categoria:string
preco_custo:number
preco_venda:number
estoque_atual:number
estoque_minimo:Number
estoque_maximo:number
localizacao:string
data_validade:Date
fornecedor_id?: Fornecedor
ativo:string
data_cadastro:Date
observacoes:string
}