import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';
import { FormaPagamentoCreateComponent } from './components/formaPagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component';
import { LivroCreateComponent } from './components/livro/livro-create/livro-create.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';


//configuração para rotear entre as paginas na home
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'fpagamentos', component: FormaPagamentoCrudComponent },
  { path: 'fpagamentos/create', component: FormaPagamentoCreateComponent },
  { path: 'fornecedor', component: FornecedorCrudComponent },
  { path: 'fornecedor/create', component: FornecedorCreateComponent },
  { path: 'cliente', component: ClienteCrudComponent },
  { path: 'cliente/create', component: ClienteCreateComponent },
  { path: 'livro', component: LivroCrudComponent },
  { path: 'livro/create', component: LivroCreateComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
