import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  errMessage = ''

  login() {
    const {email, password} = this.loginForm.value
    if (email && password) {
      this.authService.login(email,password).subscribe({
        next: () => {
          alert("Login successfully!")
          this.router.navigate(['/home'])
        },
        error: (err) => (this.errMessage = err)
      })
    } else {
      this.errMessage = "Please fill the information!"
    }
  }
}
