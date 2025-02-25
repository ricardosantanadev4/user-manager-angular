import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usuarioResolver } from '../shared/resolvers/usuario.resolver';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DetalheUsuarioComponent } from './components/usuario/detalhe-usuario/detalhe-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { autenticadorGuard } from '../shared/security/autenticador.guard';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, children: [
      { path: 'usuarios', component: UsuarioComponent, canActivate: [autenticadorGuard] },
      { path: 'usuarios/detalhe', component: DetalheUsuarioComponent, canActivate: [autenticadorGuard] },
      {
        path: 'usuarios/detalhe/:id', component: DetalheUsuarioComponent,
        resolve: { usuarioResolver: usuarioResolver }, canActivate: [autenticadorGuard]
      },
    ]
    , canActivate: [autenticadorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }