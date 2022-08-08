import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Dialog } from 'src/app/model/dialog.model';
import { Order } from 'src/app/model/order.model';
import { Status } from 'src/app/model/status.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SimpleDialogComponent } from '../../simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-closedOrder',
  templateUrl: './closedOrder.component.html',
  styleUrls: ['./closedOrder.component.scss']
})
export class ClosedOrderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'client', 'price','createdDt', 'closedDt','cancelledDt','status','edit'];
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

    return this.dashboardService.getInactiveOrders().subscribe(
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




  isDisabled(status,elementname){
    if(status && elementname)
    {
    if((status!=elementname))
    return "disabled";
    }

  }

  formatDate( date:Date):string{
    if(date)
    {
      let datec = new Date(date);
      return datec.toLocaleString();
    }

  }







}
