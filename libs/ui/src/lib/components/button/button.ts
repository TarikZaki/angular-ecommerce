import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {}
