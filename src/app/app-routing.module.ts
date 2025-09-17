import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { ProdutoCrudComponent } from './views/produto-crud/produto-crud.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';
import { FormaPagamentoCreateComponent } from './components/formaPagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component';
import { LivroCreateComponent } from './components/livro/livro-create/livro-create.component';


//configuração para rotear entre as paginas na home
const routes: Routes = [
  {
    path: "fpagamentos",
    component: FormaPagamentoCrudComponent
  },
  {path: "produto",
    component: ProdutoCrudComponent
  },
  {path: "fornecedor",
    component: FornecedorCrudComponent
  },
  {
    path: "fpagamentos/create",
    component: FormaPagamentoCreateComponent
  },
{path: "fornecedor/create",
  component: FornecedorCreateComponent
},
{path: "produto/create",
    component: ProdutoCreateComponent
  },
  {path: "cliente/create",
    component: ClienteCreateComponent
  },
  {path: "cliente",
    component: ClienteCrudComponent
  },
  {path: "livro",
    component: LivroCrudComponent
  },
  {path: "livro/create",
    component: LivroCreateComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
