import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { PaginaInicialComponent } from '@app/interfaces/pages/pagina-inicial/pagina-inicial.component';
import { LoginComponent } from '@app/interfaces/pages/login/login.component';
import { CadastroComponent } from '@app/interfaces/pages/cadastro/cadastro.component';
import { HomeComponent } from '../interfaces/pages/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '@app/guards/admin.guard';
import { CampoUsuariosComponent } from '@app/interfaces/pages/campo-usuarios/campo-usuarios.component';
import { CriarUsuarioComponent } from '@app/interfaces/pages/criar-usuario/criar-usuario.component';
import { EditarUsuarioComponent } from '@app/interfaces/pages/editar-usuarios/editar-usuario.component';
import { RedirectGuard } from '@app/guards/redirect.guard'; 
import { RedirectComponent } from '@app/guards/redirect.component'; 

export const routes: Routes = [
  { path: '', component: RedirectComponent, canActivate: [RedirectGuard], pathMatch: 'full' },
  { path: 'inicial', component: PaginaInicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: CampoUsuariosComponent, canActivate: [AdminGuard, AuthGuard] },
  { path: 'usuarios/criar', component: CriarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];


export const routing = provideRouter(routes);