import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExpensePageModule } from './expense/expense.module';
import { IncomePageModule } from './income/income.module';
import { LoginPageModule } from './login/login.module';
import { ExpenseListPageModule } from './expense-list/expense-list.module';
import { IncomeListPageModule } from './income-list/income-list.module';


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
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    LoginPageModule,
    ExpensePageModule,
    IncomePageModule,
    ExpenseListPageModule,
    IncomeListPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
