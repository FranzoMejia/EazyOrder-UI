import { Product } from './../../model/product.module';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../../constants/app.constants";
import { environment } from '../../../environments/environment';
import { User } from '../../model/user.model';
import { Contact } from '../../model/contact.model';
import { Observable } from 'rxjs';
import { Client } from '../../model/client.model';
import { Order } from 'src/app/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getAccountDetails(user : User){
    return this.http.post(environment.rooturl + AppConstants.ACCOUNT_API_URL,user,{ observe: 'response',withCredentials: true });
  }

  getAccountTransactions(user : User){
    return this.http.post(environment.rooturl + AppConstants.BALANCE_API_URL,user,{ observe: 'response',withCredentials: true });
  }

  getLoansDetails(user : User){
    return this.http.post(environment.rooturl + AppConstants.LOANS_API_URL,user,{ observe: 'response',withCredentials: true });
  }

  getCardsDetails(user : User){
    return this.http.post(environment.rooturl + AppConstants.CARDS_API_URL,user,{ observe: 'response',withCredentials: true });
  }

  getNoticeDetails(){
    return this.http.get(environment.rooturl + AppConstants.NOTICES_API_URL,{ observe: 'response' });
  }

  saveMessage(contact : Contact){
    return this.http.post(environment.rooturl + AppConstants.CONTACT_API_URL,contact,{ observe: 'response'});
  }

  getAllProductList():Observable<Product[]> {
    return this.http.get<Product[]>(environment.rooturl + AppConstants.PRODUCTPATH_API_URL + AppConstants.PRODUCTALL_API_URL);
  }

  deleteProductList(id){
    return this.http.delete(environment.rooturl + AppConstants.PRODUCTPATH_API_URL + AppConstants.PRODUCTDELETE_API_URL+"/"+id,{ observe: 'response' });
  }

  addProductList(product){
    return this.http.post(environment.rooturl + AppConstants.PRODUCTPATH_API_URL + AppConstants.PRODUCTADD_API_URL,product,{ observe: 'response' });
  }

  getAllClientList():Observable<Client[]> {
    return this.http.get<Client[]>(environment.rooturl + AppConstants.CLIENT_API_URL);
  }

  getClient(clientId):Observable<Client[]> {
    return this.http.get<Client[]>(environment.rooturl + AppConstants.CLIENT_API_URL +"/"+clientId);
  }


  deleteClientList(id){
    return this.http.delete(environment.rooturl + AppConstants.CLIENT_API_URL+"/"+id,{ observe: 'response' });
  }

  addClientList(client){
    return this.http.post(environment.rooturl + AppConstants.CLIENT_API_URL,client,{ observe: 'response' });
  }

  getAllOrders():Observable<Order[]> {
    return this.http.get<Order[]>(environment.rooturl + AppConstants.ORDER_API_URL);
  }

  getActiveOrders():Observable<Order[]> {
    return this.http.get<Order[]>(environment.rooturl + AppConstants.ORDER_ACTIVE_API_URL);
  }

  getInactiveOrders():Observable<Order[]> {
    return this.http.get<Order[]>(environment.rooturl + AppConstants.ORDER_INACTIVE_API_URL);
  }


  updateOrderStatus(order){
    return this.http.post(environment.rooturl+ AppConstants.ORDER_API_URL,order,{ observe: 'response' });

  }

  getOrder(id):Observable<Order[]> {
    return this.http.get<Order[]>(environment.rooturl + AppConstants.ORDER_GET_API_URL +"/"+id);
  }


}
