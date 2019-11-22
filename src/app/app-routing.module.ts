import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'expense', loadChildren: './expense/expense.module#ExpensePageModule' },
  { path: 'income', loadChildren: './income/income.module#IncomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'expense-list', loadChildren: './expense-list/expense-list.module#ExpenseListPageModule' },
  { path: 'income-list', loadChildren: './income-list/income-list.module#IncomeListPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'total', loadChildren: './total/total.module#TotalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
