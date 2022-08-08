import { AddproductorderComponent } from './addproductorder/addproductorder.component';
import { Product } from './../../../model/product.module';
import { Address } from 'src/app/model/address.module';
import { element } from 'protractor';
import { Status } from './../../../model/status.model';
import { Order, OrderProduct } from './../../../model/order.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Client } from 'src/app/model/client.model';
import { Observable } from 'rxjs';
import {ignoreElements, map, startWith} from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Dialog } from 'src/app/model/dialog.model';



@Component({
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {



  total:number=0;
  phone:string='';
  clientAddress:Address[];
  tittle:string;
  id:number;
  displayedColumns: string[] = [ 'name', 'qty', 'price','product-delete'];
  dataSource= new MatTableDataSource();
  order: Order = new Order;
  clients:Client[];
  clientSelected:Client;
  orderProduct:OrderProduct[]=[];
  listProducts:Product[];
  isDisabled:string;




  options: string[] = [];
  filteredOptions: Observable<string[]>;

  form = this.fb.group({
    clientName:[''],
    clientAddress: ['',Validators.required],
    paidMethod:['',Validators.required],
    comments:[this.order.comments,Validators.required]
  });

  constructor(private router: Router,private fb: FormBuilder,private dialog: MatDialog,private dashboardService: DashboardService,private _route:ActivatedRoute) {
    console.log(this._route.snapshot.paramMap.get('id'));
    this.id= Number(this._route.snapshot.paramMap.get('id'));
    this.getClients();
    this.getProducts();
    if(this.id==null||this.id==0){
      this.setNewOrder();
    }
    else{
      this.getOrder();
    }



   }
  getProducts() {
    return this.dashboardService.getAllProductList().subscribe(
      (responseData:Product[]) => {
      let ELEMENT_DATA_3= responseData;
      this.listProducts = ELEMENT_DATA_3;
      }, error => {
        console.log(error);
      });

  }

   setNewOrder(){
    this.order = new Order();
    this.order.status = Status.CREATED;
    this.tittle = 'NEW ORDER';

}



  ngOnInit(): void {

    if(this.order.status==Status.CLOSED)
    {

    }

    this.filteredOptions = this.form.controls.clientName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        if(this.clientExists(name))
        {
          console.log(name);
        }
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );


    this.dataSource.data = this.orderProduct;
  }


   clientExists(clientName):boolean{
    if(this.clients && clientName!='')
    {
    let client = this.clients.find((obj)=>{
      return obj.name ===clientName;
    });

    if(client)
    {
      this.clientSelected = client;
      this.phone = this.clientSelected.phone;
      this.clientAddress= this.clientSelected.addresses;
      return true;

    }
    else{
      this.clientSelected=null;
      this.phone = null;
      this.clientAddress=[];
      return false;
    }

  }
  return false;

  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getClients() {
    return this.dashboardService.getAllClientList().subscribe(
      (responseData:Client[]) => {
        this.clients=responseData;
      responseData.forEach(
        (element) =>
        {

          this.options.push(element.name)
        }
      );
      this.ngOnInit();

      }, error => {
        console.log(error);
      });
  }

  addProduct(){
   this.openProductSelect();

}
  calcTotal() {
    let total:number=0;
    this.orderProduct.forEach(
      function (value) {

        total=total+value.price;
      }

    )
    this.total=total;
  }
onClickDelete(element){
    let index = this.orderProduct.indexOf(element);
    this.orderProduct.splice(index,1);
    this.dataSource.data= this.orderProduct;
    this.calcTotal();

}

save(){

  this.calcTotal();
  if(this.form.valid &&this.clientExists(this.form.value.clientName)){

    this.order.comments= this.form.value.comments;
    this.order.price = this.total;
    this.order.addresses =
    this.clientAddress.find((obj)=>{
      return obj.id ===this.form.value.clientAddress;
    });
    this.order.client = this.clientSelected;
    this.order.orderProduct= this.orderProduct;
    this.order.paidMethod= this.form.value.paidMethod;
    this.order.active = true;
    this.dashboardService.updateOrderStatus(this.order).subscribe(
      responseData => {
        console.log(responseData);
        this.router.navigate(['/order']);
      }, error => {
        console.log(error);
      });


  }


}

getOrder(){

  return this.dashboardService.getOrder(this.id).subscribe(
    (responseData:Order[]) => {
    this.order = responseData[0];
    this.form.controls['comments'].setValue(this.order.comments);
    this.form.controls['clientName'].setValue(this.order.client.name);
    this.total=this.order.price;
    this.form.controls['clientAddress'].setValue(this.order.addresses.id);
    this.clientSelected= this.order.client;
    this.orderProduct = addPrice(this.order.orderProduct);
    this.dataSource.data = this.orderProduct ;
    this.form.value.paidMethod = this.order.paidMethod;
    this.form.controls['paidMethod'].setValue(this.order.paidMethod);


    if(this.order.status.toString() ==='CANCELLED'||  this.order.status.toString() ==='CLOSED')
    {
    this.isDisabled='disabled';
    }

    }, error => {
      console.log(error);
    });

}
  openProductSelect() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.panelClass= "modal-panel";
    config.backdropClass="backdrop-modal-panel";
    let dialog:Dialog = new Dialog();
    dialog.tittle="Add a product"
    config.data =dialog;
    const dialogRef=  this.dialog.open(AddproductorderComponent,config);

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      if(result)
      {
        let orderP:OrderProduct = new OrderProduct;
        orderP.product= result.product;
        orderP.qty= result.qty;
        orderP.price = calcPrice(orderP);
        this.orderProduct.push(orderP);
        this.dataSource.data = this.orderProduct;
        console.log("Add product added");
        this.calcTotal();
      }
    });



  }








}
function calcPrice(orderElement: OrderProduct): number {

  return orderElement.product.price*orderElement.qty;
}

function addPrice(orderProduct: OrderProduct[]): OrderProduct[] {
  orderProduct.forEach(
    function (value) {
        value.price= value.qty*value.product.price;
    }

  )
  return orderProduct;
}


