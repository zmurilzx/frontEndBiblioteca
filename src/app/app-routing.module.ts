import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { ProdutoCrudComponent } from './views/produto-crud/produto-crud.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
