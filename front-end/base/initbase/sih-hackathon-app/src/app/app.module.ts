import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


//custom-components
import { NavbarComponent } from './navbar/navbar.component';
import { LogSigComponent } from './login_signup/log-sig.component';
import { UserComponent } from './userarea/userarea.component';
import { AdminComponent } from './admin/adminarea.component';
import { HomeComponent } from './homearea/home.component';
import { UserComplaintComponent } from './userarea/usercomplaints/usercomplaint.component';
import { UserFormComponent } from './userarea/userform/userform.component';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { AfterSubComponent } from './afterSubmission/afterSub.component';
import { UserSettingComponent } from './userarea/settingsarea/usersettings.component';
import { PasSettingComponent } from './userarea/settingsarea/passwordsettings/tings.component';
import { MainPageComponent } from './mainpage/mainpage.component';
import { SettingsNavComponent } from './userarea/settingsarea/settingsnav/settingsnav.component';
import { AdminLoginComponent } from './login_signup/adminlogarea/admin-login.component';
import { AdminPieComponent } from './admin-dashboard/admin-piechart/admin-pie.component';
import { AdminCounterComponent } from './admin-dashboard/admin-counter/admin-counter.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { PendCompComponent } from './admin-dashboard/pendcomplaints/pendcomplaints.component';
import { NewCompComponent } from './admin-dashboard/newcomplaints/newcomp.component';
import { CompCompComponent } from './admin-dashboard/compcomplaints/compcomp.component';
import { PendByIdComponent } from './admin-dashboard/pendcomplaints/pendingbyid/pendbyid.component';
import  { NewByIdComponent } from './admin-dashboard/newcomplaints/newbyid/newbyid.component';
import { CompByIdComponent } from './admin-dashboard/compcomplaints/compbyid/compbyid.component';
import { AdminSettingsComponent } from './admin/adminsettings/adminsettings.component';
//custom-components

import { AppComponent } from './app.component';
import { routes } from './routes/app-routes';
import { RouterModule,Routes } from '@angular/router';

//services
import {AuthManager} from './services/authmanager.service';
import { AppService } from './services/app-services';
import { EqualValidator } from './services/equal-validator';
import { AdminAuthManager } from './services/auth_admin_man';


//externalServices
import { ChartsModule } from 'ng2-charts';
import { SimpleNotificationsModule } from 'angular2-notifications';
//angular2-notifications
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogSigComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    UserFormComponent,
    UserComplaintComponent,
    EqualValidator,
    NavbarHomeComponent,
    AfterSubComponent,
    UserSettingComponent,
    PasSettingComponent,
    SettingsNavComponent,
    MainPageComponent,
    AdminLoginComponent,
    NavbarAdminComponent,
    AdminPieComponent,
    AdminCounterComponent,
    PendCompComponent,
    NewCompComponent,
    CompCompComponent,
    PendByIdComponent,
    NewByIdComponent,
    CompByIdComponent,
    AdminSettingsComponent
  ],
  imports: [
    JsonpModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    ChartsModule
  ],
  providers: [AuthManager,AdminAuthManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
