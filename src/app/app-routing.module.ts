import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';

const routes: Routes = [
  { path: '', component: CadastroLoginComponent },
  { path: 'signUp', component: CadastroLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
