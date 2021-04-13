import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LayoutComponent } from './presentation/layout/layout.component';
import { SidebarComponent } from './presentation/sidebar/sidebar.component';
import { HeaderComponent } from './presentation/header/header.component';
import { LoginComponent } from './presentation/login/login.component';
import { NotFoundComponent } from './presentation/not-found/not-found.component';
import { ServerErrorComponent } from './presentation/server-error/server-error.component';
import { SignupComponent } from './presentation/signup/signup.component';
import { AccessDeniedComponent } from './presentation/access-denied/access-denied.component';
import { ChangePasswordComponent } from './presentation/change-password/change-password.component';
import { FirmaComponent } from './presentation/firma/firma.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDropdownModule,
        RouterModule,
        TranslateModule,
        BreadcrumbModule,
        CommonModule,
        FormsModule,
        PanelModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        MessageModule,
        ProgressBarModule,
        ProgressSpinnerModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        LoginComponent,
        NotFoundComponent,
        ServerErrorComponent,
        SignupComponent,
        AccessDeniedComponent,
        ChangePasswordComponent,
        FirmaComponent
    ]
})
export class HomeModule {}