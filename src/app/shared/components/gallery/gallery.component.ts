import { Component, Input, OnInit } from '@angular/core';
import { CategoriesResponse } from 'src/app/shared/interfaces/store.interface';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [ './gallery.component.css']
  
})
export class GalleryComponent implements OnInit {

  @Input() categorie !: CategoriesResponse[];

  constructor() { }

  ngOnInit(): void {
  }

}
