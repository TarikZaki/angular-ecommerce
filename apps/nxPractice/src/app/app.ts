import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from '@org/ui';

/**
 *
 */
@Component({
  imports: [RouterModule, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
/**
 * Root application component.
 */
export class App {
  protected title = 'nxPractice';
}
