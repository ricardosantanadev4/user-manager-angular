import { Routes } from '@angular/router';
import { autenticadorGuard } from './shared/security/autenticador.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    {
        path: '', loadChildren: () => import('./dashboard/dashboard.module')
            .then(m => m.DashboardModule), canActivate: [autenticadorGuard]
    }

];