import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { AuthService } from './core/services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    HeaderComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project-management';
  isLoggedIn = false

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn(); 
    this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
}
