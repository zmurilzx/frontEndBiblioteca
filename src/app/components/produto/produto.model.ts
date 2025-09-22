import { Fornecedor } from "../fornecedor/fornecedor.model"

export interface   Produto{
proId: number
proNome:string
proDescricao:string
proCodigo_barras:number
proReferencia:string
proUnidade_medida:number
proMarca:string
proCategoria:string
proPreco_custo:number
proPreco_venda:number
proEstoque_atual:number
proEstoque_minimo:Number
proEstoque_maximo:number
proLocalizacao:string
proData_validade:Date
proFornecedor_id?: Fornecedor
proAtivo:string
proData_cadastro:Date
proObservacoes:string
}