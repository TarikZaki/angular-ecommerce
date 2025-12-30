import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '@org/models';
import { CartService, ControlsService } from '@org/services';
import { Button } from '@org/ui';
import { ToastService } from 'ngx-toastr-notifier';
import { filter, map, switchMap } from 'rxjs';

import { ProductInfo } from './service/product-info';

/**
 * Component to display detailed information about a specific product.
 */
@Component({
  selector: 'lib-product-details',
  imports: [Button],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productInfo = inject(ProductInfo);
  private readonly toastrService = inject(ToastService);
  private readonly cartService = inject(CartService);
  private readonly controlsService = inject(ControlsService);
  id = signal<string | null>(null);
  productDetails = signal<product | null>(null);

  /**
   *  Initialize the component and retrieve the product ID from the route.
   */
  ngOnInit(): void {
    this.getProductId();
  }

  /**
   * Get product ID from route parameters and fetch product details.
   */
  getProductId(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => !!id),
        switchMap((id) => this.productInfo.getProductDetails(id))
      )
      .subscribe((res) => {
        this.productDetails.set(res.data);
      });
  }

  /**
   * Adds a product to the cart and updates the local cart products map.
   *
   * @param id - The product ID to add to cart
   */
  addToCart(id: string): void {
    this.cartService.AddProductToCart(id).subscribe({
      next: () => {
        this.toastrService.success('Product added to cart successfully');
        this.controlsService.loadCart();
      },
      error: (err) => {
        console.error('Failed to add product to cart:', err);
        this.toastrService.error(
          'Failed to add product to cart. Please try again.'
        );
      },
    });
  }
}
