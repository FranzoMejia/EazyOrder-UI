import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Product } from './../../model/product.module';

/*  export interface PeriodicElement {
  name: string;
  id: number;
  price: number;
  description: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', price: 1.0079, description: "H"},
  {id: 2, name: 'Helium', price: 1.0079, description: "H"},
  {id: 3, name: 'Lithium', price: 1.0079, description: "H"},
  {id: 4, name: 'Beryllium', price: 1.0079, description: "H"},
  {id: 5, name: 'Boron', price: 1.0079, description: "H"},
  {id: 6, name: 'Carbon', price: 1.0079, description: "H"},
  {id: 7, name: 'Nitrogen', price: 1.0079, description: "H"},
  {id: 8, name: 'Oxygen', price: 1.0079, description: "H"},
  {id: 9, name: 'Fluorine', price: 1.0079, description: "H"},
  {id: 10, name: 'Neon', price: 1.0079, description: "H"},
];
 */

let ELEMENT_DATA: Product[]=[
  {id: 1, name: 'Hydrogen', active:true ,price: 1.0079, description: "H"},
  {id: 2, name: 'Hydrogen', active:true ,price: 1.0079, description: "H"}];


@Component({
  selector: 'app-sorttable',
  templateUrl: './sorttable.component.html',
  styleUrls: ['./sorttable.component.css']
})
export class SorttableComponent implements AfterViewInit,OnInit{

  displayedColumns: string[] = ['id', 'name', 'description', 'price','product-delete','product-edit'];
  dataSource = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer,private dashboardService: DashboardService) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {


    this.getProducts();

}

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

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

}


