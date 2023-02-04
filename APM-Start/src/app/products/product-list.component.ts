import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, startWith, Subject, Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

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
  // categories: ProductCategory[] = [];
  // selectedCategoryId = 1;
  private categorySelectedSubject = new BehaviorSubject<number>(1);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  /* just data stream
  products$ = this.productService.productWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY
      })
  ) 
  */
  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$
    /* .pipe(
      startWith(0)
    ) */
  ])
  .pipe(
    map(([products, selectedCategoryId]) =>
      products.filter( product => 
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
    )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )

  category$ = this.productCategoryService.productCategories$.pipe(
    catchError(err=>{
      this.errorMessage = err;
      return EMPTY
    })
  )

  /* productsSimpleFilter$ = this.products$.pipe(
    map(products => 
      products.filter(product => this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true))
  ) */
  sub!: Subscription;

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next( +categoryId );
    // console.log('Not yet implemented');
  }
}
