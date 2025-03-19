import { Routes } from '@angular/router';
import { ProjectComponent } from './pages/project/project.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { guestGuard } from './core/guard/guest.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'home', component: ProjectComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login'}
];
