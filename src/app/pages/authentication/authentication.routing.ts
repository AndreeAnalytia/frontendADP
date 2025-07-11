import { Routes } from '@angular/router';
import { AppErrorComponent } from './error/error.component';
import { AppSideLoginComponent } from './side-login/side-login.component';
import { SideRegisterComponent } from '../side-register/side-register.component';
import { SideRecoveryComponent } from '../side-recovery/side-recovery.component';
import { SideResetComponent } from '../side-reset/side-reset.component';

// import { BusinessComponent } from '../business/business.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: AppErrorComponent,
      },
      {
        path: 'side-login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: SideRegisterComponent,
      },
      {
        path: 'recovery',
        component: SideRecoveryComponent,
      },
      {
        path: 'reset/:token',
        component: SideResetComponent,
      },
    ],
  },
];
