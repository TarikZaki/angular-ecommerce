import {
  ChangeDetectionStrategy,
  Component,
  signal,
  input,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'lib-input',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
  typeInput = input('text', { alias: 'type' });
  placeholder = input('');
  label = input('');
  control = input<any>();

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    console.log('click event', event);
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
