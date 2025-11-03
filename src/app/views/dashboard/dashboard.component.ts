import { Component } from '@angular/core';

interface DashboardStat {
  icon: string;
  label: string;
  value: number;
  trend: string;
  trendLabel: string;
  positive: boolean;
  progress: number;
}

interface DashboardModule {
  icon: string;
  title: string;
  description: string;
  route: string;
  accent: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chartData: number[] = [8, 9, 7, 10, 12, 11, 13, 12, 14, 13, 16, 18, 17, 19, 22, 20, 23, 25, 24, 26, 27, 26, 28, 30, 29, 31, 33, 32, 34, 36];

  readonly stats: DashboardStat[] = [
    { icon: 'group', label: 'Clientes', value: 128, trend: '+12%', trendLabel: 'Comparado ao mes anterior', positive: true, progress: 78 },
    { icon: 'local_shipping', label: 'Fornecedores', value: 32, trend: '+4%', trendLabel: 'Novos cadastros no mes', positive: true, progress: 54 },
    { icon: 'menu_book', label: 'Livros', value: 864, trend: '+9%', trendLabel: 'Novos titulos adicionados', positive: true, progress: 87 },
    { icon: 'payments', label: 'Pagamentos', value: 57, trend: '-3%', trendLabel: 'Pendentes no ciclo atual', positive: false, progress: 41 }
  ];

  readonly modules: DashboardModule[] = [
    { icon: 'group', title: 'Clientes', description: 'Gerencie cadastros, contatos e enderecos.', route: '/cliente', accent: 'accent-blue' },
    { icon: 'local_shipping', title: 'Fornecedores', description: 'Cadastre fornecedores e acompanhe contratos.', route: '/fornecedor', accent: 'accent-amber' },
    { icon: 'menu_book', title: 'Livros', description: 'Catalogo completo com avaliacoes e estoque.', route: '/livro', accent: 'accent-purple' },
    { icon: 'payments', title: 'Pagamentos', description: 'Formas de pagamento e condicoes especiais.', route: '/fpagamentos', accent: 'accent-teal' }
  ];
}
