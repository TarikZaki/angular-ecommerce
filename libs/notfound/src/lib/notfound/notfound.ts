import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@org/ui';

/**
 * 404 page shown when no route matches.
 */
@Component({
  selector: 'lib-notfound',
  imports: [RouterLink, Button],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound {}
