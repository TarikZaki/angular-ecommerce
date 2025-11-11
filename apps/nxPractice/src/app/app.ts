import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 *
 */
@Component({
  imports: [RouterModule],
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
