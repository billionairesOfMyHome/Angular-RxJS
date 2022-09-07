import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { catchError, EMPTY, map, Observable, Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent{
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];
  selectedCategoryId = 1;

  products$ = this.productService.productWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY
      })
  )

  productsSimpleFilter$ = this.products$.pipe(
    map(products => 
      products.filter(product => this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true))
  )
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
