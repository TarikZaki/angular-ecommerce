import { Component, inject, OnInit } from '@angular/core';
import { product } from '@org/models';
import { ProductCard } from '@org/productCard';
import { Products } from '@org/services';
/**
 *
 */
@Component({
  selector: 'lib-products-component',
  imports: [ProductCard],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(Products);
  productList: product[] = [];

  /**
   *  ngOnInit
   */
  ngOnInit(): void {
    this.getAllProducts();
  }

  /**
   *  Get All Products
   */
  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
