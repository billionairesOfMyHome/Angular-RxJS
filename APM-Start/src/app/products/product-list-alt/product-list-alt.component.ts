import { ChangeDetectionStrategy, Component } from '@angular/core';

import { catchError, EMPTY, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProduct$ = this.productService.selectedProduct$;

  products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err=>{
        this.errorMessage = err;
        return EMPTY;
      })
    )
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId)
  }
}