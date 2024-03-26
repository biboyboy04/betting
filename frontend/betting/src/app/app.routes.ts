import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'user-dashboard',
    loadComponent: () => import('./user-dashboard/user-dashboard.page').then( m => m.UserDashboardPage),
    loadChildren: () => import('./user-dashboard/user-dashboard.routes').then( m => m.routes)
  },

];
