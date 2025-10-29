import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '@org/ui';

@Component({
  selector: 'lib-auth-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
