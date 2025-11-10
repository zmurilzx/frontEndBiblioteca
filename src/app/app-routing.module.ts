import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';
import { FormaPagamentoCreateComponent } from './components/forma-pagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component';
import { LivroCreateComponent } from './components/livro/livro-create/livro-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { LivroUpdateComponent } from './components/livro/livro-update/livro-update.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EmprestimoReadComponent } from './components/emprestimo/emprestimo-read/emprestimo-read.component';
import { EmprestimoCreateComponent } from './components/emprestimo/emprestimo-create/emprestimo-create.component';
import { FormaPagamentoUpdateComponent } from './components/forma-pagamento/forma-pagamento-update/forma-pagamento-update.component';


// configuracao das rotas principais
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'fpagamentos', component: FormaPagamentoCrudComponent },
  { path: 'fpagamentos/create', component: FormaPagamentoCreateComponent },
  { path: 'fpagamentos/update/:id', component: FormaPagamentoUpdateComponent },
  { path: 'fornecedor', component: FornecedorCrudComponent },
  { path: 'fornecedor/create', component: FornecedorCreateComponent },
  { path: 'cliente', component: ClienteCrudComponent },
  { path: 'cliente/create', component: ClienteCreateComponent },
  { path: 'cliente/update/:id', component: ClienteUpdateComponent },
  { path: 'livro', component: LivroCrudComponent },
  { path: 'livro/create', component: LivroCreateComponent },
  { path: 'livro/update/:id', component: LivroUpdateComponent },
  { path: 'emprestimos', component: EmprestimoReadComponent },
  { path: 'emprestimos/create', component: EmprestimoCreateComponent },
  { path: 'fornecedor/update/:id', component: FornecedorUpdateComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


