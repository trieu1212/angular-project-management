import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { guestGuard } from './core/guard/guest.guard';
import { ProjectComponent } from './pages/project/project.component';
import { TaskComponent } from './pages/task/task.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'home', component: ProjectComponent, canActivate: [authGuard] },
    { path: 'project/:id', component: TaskComponent, canActivate:[authGuard] },
    { path: '**', redirectTo: 'login'}
];
