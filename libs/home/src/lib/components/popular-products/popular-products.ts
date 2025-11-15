import { Component, inject, OnInit } from '@angular/core';
import { product } from '@org/models';
import { ProductService } from '../../services/product-service';
import { Card } from '@org/ui';

@Component({
  selector: 'lib-popular-products',
  imports: [Card],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts implements OnInit {
  private readonly productService = inject(ProductService);
  productList: product[] = [];

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        console.log(this.productList);
      },
      error: () => {},
    });
  }
}
