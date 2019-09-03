import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { PostagensComponent } from './postagens/postagens.component';
import { DadosComponent } from './postagens/dados-usuarios/dados.component'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CadastroLoginComponent,
    PostagensComponent,
    DadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
