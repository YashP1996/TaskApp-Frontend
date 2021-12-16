import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModule } from './task/task.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }