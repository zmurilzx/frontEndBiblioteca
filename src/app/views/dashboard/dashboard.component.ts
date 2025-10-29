import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
interface DashboardStat {
  icon: string;
  label: string;
  value: number;
  trend: string;
  trendLabel: string;
  positive: boolean;
}

interface DashboardModule {
  icon: string;
  title: string;
  description: string;
  route: string;
  accent: string;
}

interface QuickLink {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  readonly stats: DashboardStat[] = [
    {
      icon: 'group',
      label: 'Clientes',
      value: 128,
      trend: '+12%',
      trendLabel: 'vs mês anterior',
      positive: true
    },
    {
      icon: 'local_shipping',
      label: 'Fornecedores',
      value: 32,
      trend: '+4%',
      trendLabel: 'cadastros no mês',
      positive: true
    },
    {
      icon: 'menu_book',
      label: 'Livros',
      value: 864,
      trend: '+9%',
      trendLabel: 'novos títulos',
      positive: true
    },
    {
      icon: 'payments',
      label: 'Pagamentos',
      value: 57,
      trend: '-3%',
      trendLabel: 'pendentes',
      positive: false
    }
  ];

  readonly quickLinks: QuickLink[] = [
    { icon: 'group_add', label: 'Cadastrar cliente', route: '/cliente/create' },
    { icon: 'inventory_2', label: 'Novo produto', route: '/produto/create' },
    { icon: 'menu_book', label: 'Adicionar livro', route: '/livro/create' },
    { icon: 'payments', label: 'Registrar pagamento', route: '/fpagamentos/create' }
  ];

  readonly modules: DashboardModule[] = [
    {
      icon: 'group',
      title: 'Clientes',
      description: 'Gerencie cadastros, contatos e endereços.',
      route: '/cliente',
      accent: 'accent-blue'
    },
    {
      icon: 'local_shipping',
      title: 'Fornecedores',
      description: 'Cadastre fornecedores e acompanhe contratos.',
      route: '/fornecedor',
      accent: 'accent-amber'
    },
    {
      icon: 'menu_book',
      title: 'Livros',
      description: 'Catálogo completo com avaliações e estoque.',
      route: '/livro',
      accent: 'accent-purple'
    },
    {
      icon: 'payments',
      title: 'Pagamentos',
      description: 'Formas de pagamento e condições especiais.',
      route: '/fpagamentos',
      accent: 'accent-teal'
    }
  ];
}

