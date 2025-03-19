import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  errMessage = ''

  register() {
    const {name, email, password} = this.registerForm.value
    if (name && email && password) {
      this.authService.register(name, email, password).subscribe({
        next: (userCredential) => {
          alert("Register successfully!")
          this.router.navigate(['/login'])
        },
        error: (err) => this.errMessage = err
      })
    } else {
      this.errMessage = 'Please fill the information!'
    }
  }
}
