import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { product } from '@org/models';
import { ProductCard } from '@org/productCard';
import { Products } from '@org/services';

/**
 *  product-component
 */
@Component({
  selector: 'lib-products-component',
  imports: [ProductCard, MatPaginatorModule, FormsModule],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(Products);
  allProducts = signal<product[]>([]);
  pageSize = signal(25);
  currentPage = signal(1);
  totalProducts = signal(0);
  numberOfPages = signal(0);
  pageSizeOptions = [15, 20, 25];
  searchTerm = signal('');

  productList = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.allProducts();
    }
    return this.allProducts().filter(
      (product) =>
        product.title?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.category.name.toLowerCase().includes(term)
    );
  });

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
        // console.log(res);
        this.totalProducts.set(res.results);
        this.allProducts.set(res.data);
        this.numberOfPages.set(res.metadata.numberOfPages);
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
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getAllProducts(this.currentPage(), this.pageSize());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
