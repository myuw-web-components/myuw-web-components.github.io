import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighlightService } from '../app/prism.service';

import { AppComponent } from './app.component';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { ContactsComponent } from './contacts/contacts.component';

const appRoutes: Routes = [
  { path: '', component: DemoPageComponent },
  { path: 'contacts', component: ContactsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HighlightService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
