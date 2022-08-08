import { Product } from './../../model/product.module';
import { element } from 'protractor';
import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import {MatIconModule} from '@angular/material/icon';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditProductDialog } from './product-dialog/product-dialog.component';
import { filter } from 'rxjs/operators';
import {MatSort, Sort} from '@angular/material/sort';
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize} from 'rxjs/operators';
import {merge, fromEvent, throwError} from "rxjs";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})



export class ProductComponent implements OnInit,AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'description', 'price','product-delete','product-edit'];
  dataSource= new MatTableDataSource();



  constructor(private dashboardService: DashboardService,private dialog: MatDialog) { }


  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }





  ngOnInit(): void {
    this.getProducts();

  }

  getProducts(){

    return this.dashboardService.getAllProductList().subscribe(
      (responseData:Product[]) => {
      let ELEMENT_DATA_3= responseData;
      this.dataSource.data = ELEMENT_DATA_3;
      this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });

  }

  onClickDelete(event){
    console.log(event);
    this.dashboardService.deleteProductList(event.id).subscribe(
      responseData => {
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
  }

  onClickEdit(element){
    console.log(element);
    openEditProductDialog(this.dialog,element).pipe(filter(val=>!!val)).subscribe(val=> {console.log("new product value",val); this.ngOnInit();});

  }

  addProduct(){
    let element:Product;
    openEditProductDialog(this.dialog,element).pipe(filter(val=>!!val)).subscribe(val=> {console.log("new product value",val); this.ngOnInit();});

}


}


