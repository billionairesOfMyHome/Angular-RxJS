import { Component } from '@angular/core';
import { Supplier } from 'src/app/suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: Product | null = null;
  productSuppliers: Supplier[] | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.selectedProduct$ = this.productService.selectedProduct$.pipe(
      catchError( err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )
    this.suppliers$ = this.productService.selectedProductSuppliers2$.pipe(
      catchError( err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )
    this.pageTitle$ = this.selectedProduct$.pipe(
      filter(selectedProduct => Boolean(selectedProduct)),
      map(selectedProduct => selectedProduct.productName ? 
        `Product Detail - ${selectedProduct.productName}`:'Product Detail')
    )
  }
}
