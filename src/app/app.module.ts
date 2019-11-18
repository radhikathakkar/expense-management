import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExpensePageModule } from './expense/expense.module';
import { IncomePageModule } from './income/income.module';
import { LoginPageModule } from './login/login.module';
import { ExpenseListPageModule } from './expense-list/expense-list.module';
import { IncomeListPageModule } from './income-list/income-list.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './firebase';
import { LoginService } from './services/login.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    LoginPageModule,
    ExpensePageModule,
    IncomePageModule,
    ExpenseListPageModule,
    IncomeListPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
