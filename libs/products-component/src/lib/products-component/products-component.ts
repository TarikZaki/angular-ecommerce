import { DecimalPipe } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, product } from '@org/models';
import { IProductsQueryParams } from '@org/models';
import { ProductCard } from '@org/productCard';
import { Categories, Products } from '@org/services';
import { debounceTime } from 'rxjs';
/**
 * Container for browsing and filtering products with pagination and search.
 */
@Component({
  selector: 'lib-products-component',
  imports: [
    ProductCard,
    MatPaginatorModule,
    FormsModule,
    DecimalPipe,
    MatSliderModule,
  ],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(Products);
  private readonly destroyRef = inject(DestroyRef);
  private readonly categoriesService = inject(Categories);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  allProducts = signal<product[]>([]);
  pageSize = signal(25);
  currentPage = signal(1);
  totalProducts = signal(0);
  pageSizeOptions = [15, 20, 25];
  searchTerm = signal('');
  sortBy = signal<string>('');

  minPrice = signal(100);
  maxPrice = signal(50000);

  categoryInfo = signal<Category[]>([]);
  selectedCategoryIds = signal<string[]>([]);

  /**
   * debounce for price to call api
   */
  private debouncedPriceChange = toObservable(
    computed(() => ({
      min: this.minPrice(),
      max: this.maxPrice(),
    }))
  ).pipe(debounceTime(400), takeUntilDestroyed(this.destroyRef));

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
   * Initialize initial filters and fetch categories on component load.
   */
  ngOnInit(): void {
    this.readFiltersFromUrl();
    this.getAllCategories();
    this.debouncedPriceChange.subscribe(() => {
      this.updateUrl();
      this.loadProductsByFilters();
    });
  }

  /**
   *  to store the value to sortby
   */
  onSortModelChange(value: string): void {
    this.sortBy.set(value);
    this.currentPage.set(1);
    this.updateUrl();
    this.loadProductsByFilters();
  }

  /**
   * Fetch products constrained by currently selected categories.
   * Falls back to all products when no categories are chosen.
   */
  loadProductsByFilters(): void {
    const categories = this.selectedCategoryIds();

    this.productsService
      .getProducts({
        category: categories.length ? categories : undefined,
        page: this.currentPage(),
        limit: this.pageSize(),
        sort: this.sortBy(),
        minPrice: this.minPrice(),
        maxPrice: this.maxPrice(),
      })
      .subscribe({
        next: (res) => {
          this.allProducts.set(res.data);
          this.totalProducts.set(res.results);
        },
      });
  }

  /**
   * Retrieve all available product categories.
   */
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryInfo.set(res.data);
      },
    });
  }

  /**
   * Hydrate filters from query params and trigger an initial load.
   */
  readFiltersFromUrl(): void {
    this.activatedRoute.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const page = Number(params.get('page')) || 1;
        const limit = Number(params.get('limit')) || this.pageSize();
        const minPrice = Number(params.get('minPrice')) || this.minPrice();
        const maxPrice = Number(params.get('maxPrice')) || this.maxPrice();
        const search = params.get('search') || '';
        const sort = params.get('sort') || '';
        const categories = params.getAll('category');

        this.currentPage.set(page);
        this.pageSize.set(limit);
        this.minPrice.set(minPrice);
        this.maxPrice.set(maxPrice);
        this.searchTerm.set(search);
        this.sortBy.set(sort);
        this.selectedCategoryIds.set(categories);

        this.loadProductsByFilters();
      });
  }

  /**
   * Persist current filters to the URL query params.
   */
  updateUrl(): void {
    const queryParams: IProductsQueryParams = {
      page: this.currentPage(),
      limit: this.pageSize(),
    };

    if (this.searchTerm()) {
      queryParams.search = this.searchTerm();
    }

    if (this.selectedCategoryIds().length > 0) {
      queryParams.category = this.selectedCategoryIds();
    }
    if (this.sortBy()) {
      queryParams.sort = this.sortBy();
    }

    if (this.minPrice() && this.maxPrice()) {
      queryParams.minPrice = this.minPrice();
      queryParams.maxPrice = this.maxPrice();
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }

  /**
   * Handle paginator changes by updating state and reloading products.
   */
  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.updateUrl();
    this.loadProductsByFilters();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Toggle category selection from a checkbox change event.
   * @param id category identifier.
   * @param event checkbox change event.
   */
  onCategoryToggle(id: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selectedCategoryIds();
    if (checked) {
      this.selectedCategoryIds.set([...current, id]);
    } else {
      this.selectedCategoryIds.set(current.filter((c) => c !== id));
    }
    this.currentPage.set(1);
    this.updateUrl();
    this.loadProductsByFilters();
  }
  /**
   * Clear all selected categories and reload the full product list.
   */
  resetCategory(): void {
    this.selectedCategoryIds.set([]);
    this.currentPage.set(1);
    this.updateUrl();
    this.loadProductsByFilters();
  }
  /**
   * Reset to the first page and sync the URL when search input changes.
   */
  onSearch(): void {
    this.updateUrl();
  }
}
