import { Product } from './product.module';
import { Client } from './client.model';
import {Status} from './status.model';

import { Address } from "./address.module";



export class Order {
  id:number;
  comments:string;
  price:number;
  status:Status;
  addresses:Address;
  client:Client;
  orderProduct:OrderProduct[];
  paidMethod:string;
  paidTo:string;
  deliveredBy:string;
  createdDt:Date;
  preparedDt:Date;
  sendDt:Date;
  cancelledDt:Date;
  deliveredDt:Date;
  closedDt:Date;
  active:boolean;

}




export class OrderProduct {
  id:number;
  qty:number;
  product:Product;
  price:number;


}
