import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 *
 */
@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Reusable button component with optional loading indicator.
 */
export class Button {
  clicked = output<void>();
  loading = input(false);
  /**
   *  Handle button click event
   */
  handleClick() {
    this.clicked.emit();
  }
}
