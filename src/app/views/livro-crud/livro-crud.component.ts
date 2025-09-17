import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-crud',
  templateUrl: './livro-crud.component.html',
  styleUrls: ['./livro-crud.component.css']
})
export class LivroCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
//criando interação com btoes
navigateToLivroCreate(): void{
  this.router.navigate(['/livro/create']);
}

}