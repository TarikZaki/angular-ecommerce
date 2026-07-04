import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@org/models';
import { Categories } from '@org/services';

/**
 * Categories listing page.
 */
@Component({
  selector: 'lib-categories-component',
  imports: [RouterLink],
  templateUrl: './categories-component.html',
  styleUrl: './categories-component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(Categories);

  allCategories = signal<Category[]>([]);

  /**
   * Load categories on init.
   */
  ngOnInit(): void {
    this.getAllCategories();
  }

  /**
   * Fetch all categories from the API.
   */
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories.set(res.data);
      },
    });
  }
}
