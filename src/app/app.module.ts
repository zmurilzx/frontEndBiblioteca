import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos importados de "material" para usar seus componentes
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//pegar http 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskModule } from 'ngx-mask';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './core/http-error.interceptor';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPtBrPaginatorIntl } from './shared/mat-paginator-intl-ptbr';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';
import { FormaPagamentoCreateComponent } from './components/forma-pagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FormaPagamentoReadComponent } from './components/forma-pagamento/forma-pagamento-read/forma-pagamento-read.component';
import { FormaPagamentoUpdateComponent } from './components/forma-pagamento/forma-pagamento-update/forma-pagamento-update.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component';
import { LivroCreateComponent } from './components/livro/livro-create/livro-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { LivroUpdateComponent } from './components/livro/livro-update/livro-update.component';
import { LivroReadComponent } from './components/livro/livro-read/livro-read.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { EnderecoCreateComponent } from './components/endereco/endereco-create/endereco-create.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LineChartComponent } from './components/visuals/line-chart/line-chart.component';
import { EmprestimoReadComponent } from './components/emprestimo/emprestimo-read/emprestimo-read.component';
import { EmprestimoCreateComponent } from './components/emprestimo/emprestimo-create/emprestimo-create.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    FormaPagamentoCrudComponent,
    FornecedorCrudComponent,
    FormaPagamentoCreateComponent,
    FormaPagamentoReadComponent,
    FormaPagamentoUpdateComponent,
    FornecedorCreateComponent,
    ClienteCrudComponent,
    ClienteCreateComponent,
    LivroCrudComponent,
    LivroCreateComponent,
    LivroReadComponent,
    FornecedorReadComponent,
    ClienteReadComponent,
    ClienteUpdateComponent,
    FornecedorUpdateComponent,
    LivroUpdateComponent,
    EnderecoCreateComponent,
    DashboardComponent,
    LineChartComponent,
    EmprestimoReadComponent,
    EmprestimoCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //precisamos declara os modulos de material importados
    MatToolbarModule, 
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    NgxMaskModule.forRoot({ dropSpecialCharacters: true })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }







