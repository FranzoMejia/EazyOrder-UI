


import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Client } from 'src/app/model/client.model';




@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {

  addresses;

  description: string;
  id;
  form = this.fb.group({
    id:[this.client.id],
    name: [this.client.name,Validators.required],
    phone: [this.client.phone,Validators.required]
  });

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private client:Client, private dialogRef:MatDialogRef<ClientDialogComponent>,private dashboardService: DashboardService,) {

    this.description = client.name;
    this.id = client.id;
    this.addresses = client.addresses
   }

  ngOnInit() {


  }

  close(){
    this.dialogRef.close();

  }

  save(){
    if(this.form.valid)
    {
    this.dashboardService.addProductList(this.form.value).subscribe(
      responseData => {
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
    this.dialogRef.close(this.form.value);
  }
  }


}

export function openEditClientDialog(dialog: MatDialog,product:Client){
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass= "modal-panel";
  config.backdropClass="backdrop-modal-panel";

  config.data ={ ...product};
  const dialogRef= dialog.open(ClientDialogComponent,config);

  return dialogRef.afterClosed();
}
