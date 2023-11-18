import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/Lista/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./view/Lista/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./view/Lista/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./view/usuario/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'logar',
    loadChildren: () => import('./view/usuario/logar/logar.module').then( m => m.LogarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
