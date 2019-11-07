import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { Firebase } from '@ionic-native/firebase';
// // firebase imports, omit what you don't need for your app
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExpensePageModule } from './expense/expense.module';
import { IncomePageModule } from './income/income.module';
import { LoginPageModule } from './login/login.module';


const firebaseConfig = {
  apiKey: 'AIzaSyC1I6ti1_g9CA23WeT3lqime6fvKo3twS4',
  databaseURL: 'https://expense-management-39d80.firebaseio.com',
  projectId: 'expense-management-39d80',
  storageBucket: 'expense-management-39d80.appspot.com',
  messagingSenderId: '586806847209',
  appId: '1:586806847209:web:01b0110300e76dfc2cb278',
  measurementId: 'G-JK1282X424'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireAuthModule,
    // AngularFireDatabaseModule,
    // AngularFireStorageModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LoginPageModule,
    ExpensePageModule,
    IncomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
