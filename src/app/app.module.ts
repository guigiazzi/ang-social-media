//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

//Components
import { AppComponent } from './app.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { FormCadastroComponent } from './shared/form-cadastro/form-cadastro.component';
import { PostagensComponent } from './postagens/postagens.component';
import { DadosComponent } from './postagens/dados-usuarios/dados.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroLoginComponent,
    FormCadastroComponent,
    PostagensComponent,
    DadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
