import { Component, inject, OnInit, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { product } from '@org/models';
import { ProductCard } from '@org/productCard';
import { Products } from '@org/services';
/**
 *
 */
@Component({
  selector: 'lib-products-component',
  imports: [ProductCard, MatPaginatorModule],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(Products);
  productList = signal<product[]>([]);
  totalProducts = signal(0);
  pageSize = signal(25);
  currentPage = signal(1);
  numberOfPages = signal(0);
  pageSizeOptions = [15, 20, 25];

  /**
   *  ngOnInit
   */
  ngOnInit(): void {
    this.getAllProducts();
  }

  /**
   *  Get All Products
   */
  getAllProducts(page = 1, limit = this.pageSize()): void {
    this.productsService.getAllProducts(page, limit).subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
        this.numberOfPages.set(res.metadata.numberOfPages);
        this.totalProducts.set(res.results);
        this.currentPage.set(res.metadata.currentPage);
        this.pageSize.set(res.metadata.limit);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  /**
   * Handle page change event
   */
  onPageChange(event: PageEvent): void {
    console.log('Page event:', event);

    const page = event.pageIndex + 1;
    const limit = event.pageSize;

    this.getAllProducts(page, limit);
  }
}
