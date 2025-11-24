import { Component, inject, OnInit } from '@angular/core';
import { Category } from '@org/models';
import { Categories } from '@org/services';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
/**
 * Popular Categories Component
 */
@Component({
  selector: 'lib-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.html',
  styleUrl: './popular-categories.css',
})
export class PopularCategories implements OnInit {
  private readonly categories = inject(Categories);

  categoryList: Category[] = [];

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 2,
      },
      600: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
    nav: true,
  };

  /**
   *  On init to call function getAllCategoriesData.
   */
  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  /**
   * Fetch all categories data.
   */
  getAllCategoriesData() {
    this.categories.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
    });
  }
}
