import { authGuard } from './../core/guards/auth.guard';
import { UpdateUserComponent } from './../shared/components/update-user/update-user.component';
import { AddressComponent } from './../shared/components/address/address.component';
import { ProfileUserComponent } from './../shared/components/profile-user/profile-user.component';
import { HistoryComponent } from './history/history.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { BookComponent } from './book/book.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { Routes } from '@angular/router';
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: BookComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: ProfileUserComponent,canActivate: [authGuard]
          },
          {
              path: 'address', component: AddressComponent, canActivate: [authGuard]
          },
          {
              path: 'updateUser', component: UpdateUserComponent, canActivate: [authGuard]
          }
        ],
      },
      {
        path: 'shopping', component: ShoppingComponent
      },
      {
        path: 'history', component: HistoryComponent
      }
    ],
  },
];
