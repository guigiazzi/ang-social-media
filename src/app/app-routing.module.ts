import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { PostagensComponent} from './postagens/postagens.component';

const routes: Routes = [
  { path: '', component: CadastroLoginComponent },
  { path: 'signUp', component: CadastroLoginComponent },
  { path: 'postagens', component: PostagensComponent},
  { path: 'postagens:/id', component: PostagensComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
