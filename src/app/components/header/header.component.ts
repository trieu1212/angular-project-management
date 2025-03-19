import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout()
  }

  tab(route: string) {
    this.router.navigate([route])
  }
}
