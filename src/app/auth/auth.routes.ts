import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
export const AUTH_ROUTES: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    }
]