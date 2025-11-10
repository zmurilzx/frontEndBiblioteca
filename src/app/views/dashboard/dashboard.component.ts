import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteService } from '../../components/cliente/cliente.service';
import { FornecedorService } from '../../components/fornecedor/fornecedor.service';
import { LivroService } from '../../components/livro/livro.service';
import { EmprestimoService } from '../../components/emprestimo/emprestimo.service';
import { FormaPagamentoService } from '../../components/forma-pagamento/forma-pagamento.service';

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
export class DashboardComponent implements OnInit {
  chartData: number[] = [];
  lastDays = 30;
  include = { clientes: true, fornecedores: true, livros: true } as const;
  lastUpdated: Date | null = null;

  stats: DashboardStat[] = [
    { icon: 'group', label: 'Clientes', value: 0, trend: '+0%', trendLabel: 'Comparado ao mês anterior', positive: true, progress: 50 },
    { icon: 'local_shipping', label: 'Fornecedores', value: 0, trend: '+0%', trendLabel: 'Novos cadastros no mês', positive: true, progress: 50 },
    { icon: 'menu_book', label: 'Livros', value: 0, trend: '+0%', trendLabel: 'Títulos cadastrados', positive: true, progress: 50 }
  ];

  modules: DashboardModule[] = [
    { icon: 'diversity_3', title: 'Clientes', description: 'Gerencie o cadastro de clientes.', route: '/cliente', accent: 'accent-blue' },
    { icon: 'storefront', title: 'Fornecedores', description: 'Cadastre fornecedores e acompanhe contratos.', route: '/fornecedor', accent: 'accent-amber' },
    { icon: 'auto_stories', title: 'Livros', description: 'Catálogo e estoque de livros.', route: '/livro', accent: 'accent-purple' }
  ];

  private clientesList: any[] = [];
  private fornecedoresList: any[] = [];
  private livrosList: any[] = [];
  overdueCount = 0;
  activeLoans = 0;
  activePayments = 0;
  recent: Array<{ icon: string; title: string; subtitle: string; route: string }>=[];

  constructor(
    private clientes: ClienteService,
    private fornecedores: FornecedorService,
    private livros: LivroService,
    private emprestimos: EmprestimoService,
    private formas: FormaPagamentoService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  refresh(): void {
    this.loadStats();
  }

  private loadStats(): void {
    forkJoin({
      clientes: this.clientes.read().pipe(catchError(() => of([] as any[]))),
      fornecedores: this.fornecedores.read().pipe(catchError(() => of([] as any[]))),
      livros: this.livros.read().pipe(catchError(() => of([] as any[]))),
      emprestimosAtivos: this.emprestimos.read('ATIVO').pipe(catchError(() => of([] as any[]))),
      emprestimosAtrasados: this.emprestimos.read('ATRASADO').pipe(catchError(() => of([] as any[]))),
      formas: this.formas.read().pipe(catchError(() => of([] as any[])))
    }).subscribe(({ clientes, fornecedores, livros, emprestimosAtivos, emprestimosAtrasados, formas }) => {
      this.clientesList = clientes as any[];
      this.fornecedoresList = fornecedores as any[];
      this.livrosList = livros as any[];
      this.activeLoans = (emprestimosAtivos as any[]).length;
      this.overdueCount = (emprestimosAtrasados as any[]).length;
      this.activePayments = (formas as any[]).filter((f: any)=> f?.ativo===true).length;

      this.setStatValue('Clientes', this.clientesList.length);
      this.setStatValue('Fornecedores', this.fornecedoresList.length);
      this.setStatValue('Livros', this.livrosList.length);

      this.computeRecent();
      this.updateChart();
      this.lastUpdated = new Date();
    });
  }

  changeDays(days: number): void {
    this.lastDays = days;
    this.updateChart();
  }

  toggleSource(source: 'clientes'|'fornecedores'|'livros'): void {
    // @ts-ignore - index signature not needed for readonly literal
    this.include[source] = !this.include[source];
    this.updateChart();
  }

  private setStatValue(label: string, value: number): void {
    const idx = this.stats.findIndex(s => s.label === label);
    if (idx >= 0) {
      const base = this.stats[idx];
      this.stats[idx] = { ...base, value, progress: Math.max(10, Math.min(100, value)) };
    }
  }

  private computeDailySeries(dates: Date[], days = 30): number[] {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = new Date(today); start.setDate(today.getDate() - (days - 1));
    const buckets = Array.from({ length: days }, () => 0);
    for (const dt of dates) {
      const d = new Date(dt); d.setHours(0, 0, 0, 0);
      if (d < start || d > today) continue;
      const idx = Math.round((d.getTime() - start.getTime()) / 86400000);
      if (idx >= 0 && idx < days) buckets[idx]++;
    }

    if (buckets.every(v => v === 0)) {
      // Fallback: create a gentle ramp using current totals
      const total = (this.include.clientes ? this.clientesList.length : 0)
        + (this.include.fornecedores ? this.fornecedoresList.length : 0)
        + (this.include.livros ? this.livrosList.length : 0);
      const step = total > 0 ? Math.max(1, Math.floor(total / Math.max(3, Math.floor(days / 6)))) : 0;
      let acc = 0;
      return buckets.map((_, i) => {
        if (i % Math.max(1, Math.floor(days / 6)) === 0) acc += step;
        return acc;
      });
    }
    return buckets;
  }

  private updateChart(): void {
    const dates: Date[] = [];

    // Sem campos de data explícitos no modelo atual, usamos fallback quando existir
    if (this.include.livros) {
      for (const l of this.livrosList) {
        const anyL = l as any;
        const d = anyL?.dataCadastro ? new Date(anyL.dataCadastro) : undefined;
        if (d && !isNaN(d.getTime())) dates.push(d);
      }
    }
    if (this.include.clientes) {
      for (const c of this.clientesList) {
        const anyC = c as any;
        const d = anyC?.dataCadastro ? new Date(anyC.dataCadastro) : undefined;
        if (d && !isNaN(d.getTime())) dates.push(d);
      }
    }
    if (this.include.fornecedores) {
      for (const f of this.fornecedoresList) {
        const anyF = f as any;
        const d = anyF?.dataCadastro ? new Date(anyF.dataCadastro) : undefined;
        if (d && !isNaN(d.getTime())) dates.push(d);
      }
    }
    this.chartData = this.computeDailySeries(dates, this.lastDays);
  }

  private computeRecent(): void {
    const recent: Array<{ icon: string; title: string; subtitle: string; route: string }> = [];
    const pickTop = (arr: any[], titleKey: string, subtitleKey: string|undefined, icon: string, baseRoute: string) => {
      const sorted = [...arr].sort((a: any,b: any)=> (b?.id||0)-(a?.id||0)).slice(0,3);
      for (const it of sorted) {
        recent.push({
          icon,
          title: (it as any)[titleKey] || `${baseRoute} #${(it as any)?.id}`,
          subtitle: subtitleKey ? ((it as any)[subtitleKey] || '') : '',
          route: `${baseRoute}`
        });
      }
    };
    pickTop(this.clientesList,'nome','cpf','group','/cliente');
    pickTop(this.fornecedoresList,'nomeFantasia','cnpj','storefront','/fornecedor');
    pickTop(this.livrosList,'titulo','autor','menu_book','/livro');
    this.recent = recent.slice(0,6);
  }

  get lastUpdatedText(): string {
    if (!this.lastUpdated) return 'Sem atualização';
    const h = this.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `Atualizado às ${h}`;
  }
}

