import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './sharedModule/material.module';
import { SharedModule } from './sharedModule/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { UxResponse } from './sharedModule/uxResponse.module'

import { LoginRegisterService } from './services/login-register.service';
import { AuthGaurdService } from './route-gaurds/auth-gaurd.service';
import { AlreadyLoggedInGaurdsService } from './route-gaurds/already-logged-in-gaurds.service';
import { AdminGaurdService } from './route-gaurds/admin-gaurd.service';

import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { ApiUrls } from './apiUrls/apiUrls';
import { environment } from '../environments/environment';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MomentFormat } from './sharable/momentFormat';
import { SaveRefService } from './services/save-ref.service';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { CommonModule } from '@angular/common';

/**
 * Importing modules order should be in followinf orders
 * 1) Main modules eg:- NgModule, HttpClientModule etc
 * 2) Our own Modules eg :- app routing modules and others
 * 3) Service
 * 4) Components
 */


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  // here we have added PreLazyRoutingModule before AppRoutingModule so that
  //  page not found is not detect as the AppRoutingModule contains '**'
  // wild card and will show 404 page and pages from PreLazyRoutingModule will be ignored
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    UxResponse,
    CommonModule,
    // routing module should be last else will not work for lazy and prelazy
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(environment.localStorageToken);
        },
        whitelistedDomains: environment.whiteListDomains
      }
    }),
  ],

  providers: [
    LoginRegisterService,
    ApiUrls,
    MomentFormat,
    AuthGaurdService,
    AlreadyLoggedInGaurdsService,
    AdminGaurdService,
    SaveRefService,
    NgNavigatorShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
