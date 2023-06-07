import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { GalleryComponent } from '../shared/components/gallery/gallery.component';
import { CardComponent } from '../shared/components/material/card/card.component';
import { CategoriesComponent } from '../shared/components/categories/categories.component';
import { BannerComponent } from './components/banner/banner.component';
import { PaginatorComponent } from './components/material/paginator/paginator.component';
import { Material_Modules } from './components/material/material.index';
import { SortPipe } from './pipes/sort.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';


@NgModule({
  declarations: [
    CarouselComponent,
    GalleryComponent,
    CardComponent,
    CategoriesComponent,
    BannerComponent,
    PaginatorComponent,
    SortPipe
  ],
  exports: [
    CarouselComponent,
    GalleryComponent,
    CardComponent,
    CategoriesComponent,
    BannerComponent,
    PaginatorComponent,
    SortPipe,
    Material_Modules,
  ],
  imports: [
    CommonModule,
    RouterModule,
    Material_Modules,
  ],
})
export class SharedModule { }
