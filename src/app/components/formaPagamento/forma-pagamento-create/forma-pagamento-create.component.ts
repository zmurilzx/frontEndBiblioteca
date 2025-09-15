import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forma-pagamento-create',
  templateUrl: './forma-pagamento-create.component.html',
  styleUrls: ['./forma-pagamento-create.component.css']
})
export class FormaPagamentoCreateComponent implements OnInit {

  formaPagamento = {
    proDescricao: '',
    proTipo: '',
    proNumero_Parcelas: null,
    proDias_Entre_Parcelas: null,
    proPermite_Troco: null,
    proTaxa_Percentual: null,
    proAtivo: null
  };

  constructor() { }

  ngOnInit(): void {
  }

  createFormaPagamento(): void {
    // Lógica para criar a forma de pagamento
    console.log(this.formaPagamento);
  }

  cancel(): void {
    // Lógica para cancelar
    console.log('Cancelado');
  }
}