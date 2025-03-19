import { Routes } from '@angular/router';
import { ProjectComponent } from './pages/project/project.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: ProjectComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];
