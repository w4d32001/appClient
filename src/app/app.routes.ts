import { LandingLayoutComponent } from './admin/landing-layout/landing-layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', component: LandingLayoutComponent
    },
    {
        path: 'auth', 
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    }
];
