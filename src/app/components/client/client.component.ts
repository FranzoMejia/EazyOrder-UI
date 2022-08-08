import { Address } from './../../model/address.module';
import { Client } from './../../model/client.model';
import { element } from 'protractor';
import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import {MatIconModule} from '@angular/material/icon';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditClientDialog } from './client-dialog/client-dialog.component';
import { filter } from 'rxjs/operators';
import {MatSort, Sort} from '@angular/material/sort';
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize} from 'rxjs/operators';
import {merge, fromEvent, throwError} from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})



export class ClientComponent implements OnInit,AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'phone', 'address','delete','edit'];
  dataSource= new MatTableDataSource();
  openClient;



  constructor(private dashboardService: DashboardService,private dialog: MatDialog,private router: Router) { }


  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }





  ngOnInit(): void {
    this.getProducts();

  }

  getProducts(){

    return this.dashboardService.getAllClientList().subscribe(
      (responseData:Client[]) => {
      let ELEMENT_DATA_3= responseData;
      this.dataSource.data = ELEMENT_DATA_3;
      this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });

  }

  getAddressList(list:Address[])
  {
    let addressOnString="";
    list.forEach(element => {
      //addressOnString = addressOnString +element.name+":"+ "<a href="+element.url + ">Link</a>";
      addressOnString = addressOnString +element.name;
    });
    return addressOnString;
  }

  onClickDelete(event){
    console.log(event);
    this.dashboardService.deleteClientList(event.id).subscribe(
      responseData => {
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
  }

  onClickEdit(element){
    //console.log(element);
    //openEditClientDialog(this.dialog,element).pipe(filter(val=>!!val)).subscribe(val=> {console.log("new client value",val); this.ngOnInit();});
    this.openClient=element;
    this.router.navigate(['/clientedit']);

  }

  addProduct(){
    this.openClient= new Client();
    this.router.navigate(['/clientedit']);

}


}


