import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormCadastroComponent } from './shared/form-cadastro/form-cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { PostagensComponent } from './postagens/postagens.component';
import { DadosComponent } from './postagens/dados-usuarios/dados.component'

@NgModule({
  declarations: [
    AppComponent,
    CadastroLoginComponent,
    FormCadastroComponent
    PostagensComponent,
    DadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
