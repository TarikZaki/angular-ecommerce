import { Route } from '@angular/router';

import { CategoriesComponent } from './categories-component/categories-component';

export const categoriesComponentRoutes: Route[] = [
  { path: '', component: CategoriesComponent, title: 'Categories' },
];
