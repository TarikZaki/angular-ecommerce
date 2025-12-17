import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, product } from '@org/models';
import { IProductsQueryParams } from '@org/models';
import { ProductCard } from '@org/productCard';
import { Categories, Products } from '@org/services';

/**
 * Container for browsing and filtering products with pagination and search.
 */
@Component({
  selector: 'lib-products-component',
  imports: [ProductCard, MatPaginatorModule, FormsModule],
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

  categoryInfo = signal<Category[]>([]);
  selectedCategoryIds = signal<string[]>([]);

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
  }

  /**
   * Fetch all products for the given page and page size.
   * @param page current page index starting at 1.
   * @param limit number of items per page.
   */
  getAllProducts(page = 1, limit = this.pageSize()): void {
    this.productsService.getProducts({ page, limit }).subscribe({
      next: (res) => {
        console.log(res);
        this.totalProducts.set(res.results);
        this.allProducts.set(res.data);
        this.currentPage.set(res.metadata.currentPage);
        this.pageSize.set(res.metadata.limit);
        // window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * Fetch products constrained by currently selected categories.
   * Falls back to all products when no categories are chosen.
   */
  loadProductsByFilters(): void {
    const categories = this.selectedCategoryIds();

    if (categories.length === 0) {
      this.getAllProducts(this.currentPage(), this.pageSize());
      return;
    }

    this.productsService
      .getProducts({
        category: categories,
        page: this.currentPage(),
        limit: this.pageSize(),
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
        const search = params.get('search') || '';
        const categories = params.getAll('category');

        this.currentPage.set(page);
        this.pageSize.set(limit);
        this.searchTerm.set(search);
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
    this.getAllProducts(1, this.pageSize());
  }
  /**
   * Reset to the first page and sync the URL when search input changes.
   */
  onSearch(): void {
    this.updateUrl();
    // this.currentPage.set(1);
    // this.loadProductsByFilters();
  }
}
