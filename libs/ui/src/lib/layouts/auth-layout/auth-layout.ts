import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'lib-auth-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
