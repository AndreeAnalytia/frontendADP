import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './auth.guard';
import { StarterComponent } from './pages/starter/starter.component';
import { ClaveSolComponent } from './pages/user-clave-sol/user-clave-sol.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { StatisticsUserClaveSolComponent } from './pages/statistics-clave-sol/statistics-clave-sol.component';
import { LogsComponent } from './pages/logs/logs.component';
import { UrlServicesComponent } from './pages/url-services/url-services.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'authentication/side-login',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'authentication/register',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'authentication/recovery',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'authentication/reset',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        component: StarterComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'users-clavesol',
        component: ClaveSolComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path:'logs',
        component:LogsComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path:'services',
        component:UrlServicesComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path:'statistics',
        component:StatisticsComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'list',
        component: ClaveSolComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'statistics-user',
        component: StatisticsUserClaveSolComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
