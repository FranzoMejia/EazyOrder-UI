import { Address } from './../../../model/address.module';
import { element } from 'protractor';
import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Client } from 'src/app/model/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { filter } from 'rxjs/operators';
import { AddressEditComponent, openEditAddressDialog } from './address-edit/address-edit.component';

@Component({
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  displayedColumns: string[] = ['id','name','url','delete','edit'];
  dataSource= new MatTableDataSource();
  addresses: Address[] =[];


  client: Client;
  clientId: number;

  description: string;
  id;

  form = this.fb.group({
    id:[''],
    name: ['',Validators.required],
    phone: ['',Validators.required]
  });




  constructor(private router: Router,private fb: FormBuilder,private dashboardService: DashboardService,private _route:ActivatedRoute,private dialog: MatDialog) {
    console.log(this._route.snapshot.paramMap.get('id'));
    this.clientId= Number(this._route.snapshot.paramMap.get('id'));
    if(this.clientId==0){
      this.setNewClient();
    }
    else{
      this.getClient();
    }



  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {


  }
  onClickEdit(element){

const config = new MatDialogConfig();
config.disableClose = true;
config.autoFocus = true;
config.panelClass= "modal-panel";
config.backdropClass="backdrop-modal-panel";

config.data =element;
const dialogRef= this.dialog.open(AddressEditComponent,config);

dialogRef.afterClosed().subscribe(result => {

  console.log('The dialog was closed');
  if(result)
  {
  let ind=this.addresses.indexOf(element);
  this.addresses[ind]=result;
  this.dataSource.data = this.addresses;
  }
});
  }
  onClickDelete(element){
    let index = this.addresses.indexOf(element);
    this.addresses.splice(index,1);
    this.dataSource.data= this.addresses;

  }

  getClient(){

    return this.dashboardService.getClient(this.clientId).subscribe(
      (responseData:Client[]) => {
      this.client = responseData[0];
      this.description = this.client.name;
      this.id = this.client.id;
      this.addresses = this.client.addresses;
      this.dataSource.data = this.client.addresses;
      this.dataSource.sort = this.sort;
      this.form = this.fb.group({
        id:[this.client.id],
        name: [this.client.name,Validators.required],
        phone: [this.client.phone,Validators.required]
      });
      }, error => {
        console.log(error);
      });

  }
  setNewClient(){
      this.client = new Client();

  }


  close(){
    this.router.navigateByUrl('/client');

  }

  addAddress(){
    let element:Address = new Address();
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.panelClass= "modal-panel";
    config.backdropClass="backdrop-modal-panel";

    config.data =element;
    const dialogRef= this.dialog.open(AddressEditComponent,config);

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      if(result)
      {
      this.addresses.push(result)
      this.dataSource.data = this.addresses;
      }
    });
  }

  save(){
    if(this.form.valid)
    {
      this.client.name= this.form.value.name;
      this.client.phone= this.form.value.phone;
      this.client.addresses = this.addresses;

      this.dashboardService.addClientList(this.client).subscribe(
      responseData => {
        this.router.navigateByUrl('/client');
      }, error => {
        console.log(error);
      });

  }
  }

}
