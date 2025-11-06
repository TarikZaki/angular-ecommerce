import { Component } from '@angular/core';
import { Navbar } from '@org/ui';

@Component({
  selector: 'lib-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
