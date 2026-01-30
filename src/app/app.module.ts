import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { PreferencesFormComponent } from './components/preferences-form/preferences-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ProfileFormComponent,
    PreferencesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

