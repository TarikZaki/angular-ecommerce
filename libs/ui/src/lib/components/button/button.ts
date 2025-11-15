import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  loading = input(false);
}
