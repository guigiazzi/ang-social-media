// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {MatDialogModule} from '@angular/material/dialog';

// Components
import { AppComponent } from './app.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { FormCadastroComponent } from './shared/form-cadastro/form-cadastro.component';
import { PostagensComponent } from './postagens/postagens.component';
import { PublicationComponent } from './shared/publicationsComponent/publication.component';
import { HeaderToolbarComponent } from './shared/header-toolbar/header-toolbar.component';
import { AtualizarPerfilComponent } from './atualizar-perfil/atualizar-perfil.component';
import { InterestTopicsComponent } from './shared/interest-topics/interest-topics.component';
import { ModalDialogComponent } from './shared/modal-dialog/modal-dialog.component';

// Services
import { FormatDateService } from './shared/formatDateService/format-date.service';
import { SessionService } from './shared/sessionService/session.service';
import { OpenModalService } from './shared/modal-dialog/open-modal-service.service';
import { ExternalService } from './../config/externalServices.service';

@NgModule({
  declarations: [
    AppComponent,
    CadastroLoginComponent,
    FormCadastroComponent,
    PostagensComponent,
    PublicationComponent,
    HeaderToolbarComponent,
    AtualizarPerfilComponent,
    InterestTopicsComponent,
    ModalDialogComponent
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
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    CurrencyMaskModule,
    MatDialogModule
  ],
  providers: [
    FormatDateService,
    SessionService,
    OpenModalService,
    ExternalService
  ],
  bootstrap: [AppComponent],
  entryComponents:[ModalDialogComponent]
})

export class AppModule { }
