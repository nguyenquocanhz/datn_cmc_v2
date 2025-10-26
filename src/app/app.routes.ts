import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        title: 'Đăng nhập',
        pathMatch: 'full'
    },
    {
        path: 'login',
        title: 'Đăng nhập',
        component: LoginComponent
    },
    {
        path: 'register',
        title: 'Đăng ký',
        component: RegisterComponent
    },
    {
        path: 'forgot',
        title: 'Quên mật khẩu',
        component: ForgotComponent
    },
    // cau hinh route den dashboard
    // add guard de bao ve route dashboard
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardComponent
    }
];
