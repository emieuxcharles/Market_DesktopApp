import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

/*export const firebaseConfig = {
  apiKey: 'AIzaSyBK1pgka5aIREqcYTGkZSSTOCt_dPLcUR4',
  authDomain: 'supinfo4proj-93d6d.firebaseapp.com',
  projectId: 'supinfo4proj-93d6d',
  storageBucket: 'supinfo4proj-93d6d.appspot.com',
  messagingSenderId: '357881862314',
  appId: '1:357881862314:web:80e21e468b1f4c057218d3',
  measurementId: 'G-BWSD047L54'
};*/

var firebaseConfig = {
  apiKey: "AIzaSyB_jEmR46MBkygEnqFjMknkqVnjKY7fRKU",
  authDomain: "proj-be9ad.firebaseapp.com",
  projectId: "proj-be9ad",
  storageBucket: "proj-be9ad.appspot.com",
  messagingSenderId: "1025670087272",
  appId: "1:1025670087272:web:ca2f609dc105b0f683f1dd"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
