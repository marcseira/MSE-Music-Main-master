import { Component, Input, OnInit } from '@angular/core';
import { CategoriesResponse } from 'src/app/shared/interfaces/store.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() categorie !: CategoriesResponse;

  constructor(private router: Router) { }

  redirectToCategory(categoryId: string) {
    this.router.navigate(['/category', categoryId]);
  }

  ngOnInit(): void {
  }

}
