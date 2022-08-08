import { SimpleDialogComponent } from './../simple-dialog/simple-dialog.component';
import { Dialog } from './../../model/dialog.model';
import { element } from 'protractor';
import { Status } from './../../model/status.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Order } from './../../model/order.model';
import { ValueTransformer } from '@angular/compiler/src/util';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'client', 'price', 'address','cellphone','comments','status','edit'];
  dataSource= new MatTableDataSource();

  constructor(private dashboardService: DashboardService,private dialog: MatDialog,private router: Router) { }


  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getDataSource();
  }

  getDataSource(){

    return this.dashboardService.getActiveOrders().subscribe(
      (responseData:Order[]) => {
      let ELEMENT_DATA_3=
      responseData;
      this.dataSource.data = ELEMENT_DATA_3;
      this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });

      document.getElementById("");

  }


  onClickStatus(status:Status,newStatus:Status,element:Order){

   if(Status[newStatus].valueOf()>Status[status].valueOf())
   {
    console.log(element);
    let dialog:Dialog = new Dialog();
    if(newStatus.toString()==='DELIVERED')
    {
      dialog.tittle = "Delivered by";
    }
    else
    if(newStatus.toString()==='CLOSED')
    {
      dialog.tittle = "Paid to";
    }
    else
    if(newStatus.toString()==='CANCELLED')
    {
      dialog.tittle = "Cancel reason";
    }
    else{
    dialog.tittle = "Changing to "+newStatus;
    }
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.panelClass= "modal-panel";
    config.backdropClass="backdrop-modal-panel";

    config.data =dialog;
    const dialogRef= this.dialog.open(SimpleDialogComponent,config);

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      if(result)
      {
        console.log(result);
        //element.comments = element.comments+'--'+result.tittle+result.message;
        if(newStatus.toString()==='DELIVERED')
        {
          element.deliveredBy=result.message;
        }
        else
        if(newStatus.toString()==='CLOSED')
        {
          element.paidTo = result.message;
          element.active = false;
        }
        else if(newStatus.toString()==='CANCELLED')
        {
          element.active = false;
        }

        element.status=newStatus;
        this.dashboardService.updateOrderStatus(element).subscribe(
          responseData => {
            console.log(responseData);
            this.getDataSource();
          }, error => {
            console.log(error);
          });

      }
    });
   }

    else
    console.log("false")

  }

  isDisabled(status,elementname){
    if(status && elementname)
    {
    if((status!=elementname))
    return "disabled";
    }

  }

  onClickEdit(element){
    //console.log(element);
    //openEditClientDialog(this.dialog,element).pipe(filter(val=>!!val)).subscribe(val=> {console.log("new client value",val); this.ngOnInit();});
    //this.openClient=element;
    //this.router.navigate(['/clientedit']);

  }

  addProduct(){
    //this.openClient= new Client();
    this.router.navigate(['/clientedit']);

}



}
