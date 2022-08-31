import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { catchError, EMPTY, Observable, Subscription } from 'rxjs';
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

  products$ = this.productService.productWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY
      })
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
