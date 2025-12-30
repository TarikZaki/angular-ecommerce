import { Component, inject, OnInit, signal } from '@angular/core';
import { product } from '@org/models';
import { ProductCard } from '@org/productCard';
import { Products } from '@org/services';

/**
 *  Popular Products Component
 */
@Component({
  selector: 'lib-popular-products',
  imports: [ProductCard],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts implements OnInit {
  private readonly products = inject(Products);
  productList = signal<product[]>([]);
  randomizedProducts = signal<product[]>([]);
  /**
   *  On init to call function getAllProductsData.
   */
  ngOnInit(): void {
    this.getAllProductsData();
  }

  /**
   * Fetch all products data.
   */
  getAllProductsData(): void {
    this.products.getProducts({}).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.randomizedProducts.set(
          [...this.productList()].sort(() => Math.random() - 0.5).slice(0, 10)
        );
      },
    });
  }
}
