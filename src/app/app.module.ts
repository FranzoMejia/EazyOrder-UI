import { ClosedOrderComponent } from './components/order/closedOrder/closedOrder.component';
import { OrderComponent } from './components/order/order.component';
import { ClientComponent } from './components/client/client.component';
import { ClientDialogComponent } from './components/client/client-dialog/client-dialog.component';
import { ProductDialogComponent } from './components/product/product-dialog/product-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NoticesComponent } from './components/notices/notices.component';
import { AccountComponent } from './components/account/account.component';
import { BalanceComponent } from './components/balance/balance.component';
import { LoansComponent } from './components/loans/loans.component';
import { CardsComponent } from './components/cards/cards.component';
import { XhrInterceptor } from './interceptors/app.request.interceptor';
import { AuthActivateRouteGuard } from './routeguards/auth.routeguard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { ProductComponent } from './components/product/product.component';
import { MatTableModule } from "@angular/material/table";
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { SorttableComponent } from './components/sorttable/sorttable.component';

import { AddressTableComponent } from './components/client/client-dialog/address-table/address-table.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';
import { AddressEditComponent } from './components/client/client-edit/address-edit/address-edit.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { AddorderComponent } from './components/order/addorder/addorder.component';
import { MatSelectModule } from "@angular/material/select";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatGridListModule} from '@angular/material/grid-list';
import { AddproductorderComponent } from './components/order/addorder/addproductorder/addproductorder.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    NoticesComponent,
    AccountComponent,
    BalanceComponent,
    LoansComponent,
    CardsComponent,
    CreateAccountComponent,
    ProductComponent,
    ProductDialogComponent,
    SorttableComponent,
    ClientComponent,
    ClientDialogComponent,

    AddressTableComponent,

    ClientEditComponent,

    AddressEditComponent,
    OrderComponent,
    SimpleDialogComponent,
    AddorderComponent,
    AddproductorderComponent,
    ClosedOrderComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    AppRoutingModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatSortModule,
    MatGridListModule,
    MatAutocompleteModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : XhrInterceptor,
      multi : true
    },AuthActivateRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
