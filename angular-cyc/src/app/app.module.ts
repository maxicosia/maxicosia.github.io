import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* import { NavbarComponent } from './components/navbar/navbar.component'; */
import { NavComponent } from './components/nav/nav.component';
import { WhoComponent } from './components/who/who.component';
import { BrandsComponent } from './components/brands/brands.component';
import { JobsComponent } from './components/jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    /* NavbarComponent, */
    NavComponent,
    WhoComponent,
    BrandsComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
