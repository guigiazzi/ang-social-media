import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { PostagensComponent } from './postagens/postagens.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroLoginComponent,
    PostagensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
