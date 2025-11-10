import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
import { Button, Navbar } from '@org/ui';
import { Input } from '@org/ui';

@Component({
  imports: [RouterModule, Input, Button, Navbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'nxPractice';
}
