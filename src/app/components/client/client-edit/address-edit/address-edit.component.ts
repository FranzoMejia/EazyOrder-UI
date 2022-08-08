import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Client } from 'src/app/model/client.model';
import { Address } from 'src/app/model/address.module';

@Component({
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {



  description: string;
  id: number;
  url: string;
  form = this.fb.group({
    id:[this.address.id],
    name: [this.address.name,Validators.required],
    url: [this.address.url,Validators.required]
  });
  @Output() submitClicked = new EventEmitter<any>();
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public address:Address, private dialogRef:MatDialogRef<AddressEditComponent>) {
    this.description = address.name;
    this.id = address.id;
    this.url = address.url;
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();

  }

  save(){
    if(this.form.valid)
    {
        //console.log(this.address);
        //console.log(this.form.value);
        this.address=this.form.value;
        this.submitClicked.emit(this.address);
        this.dialogRef.close();
    }
  }




}

export function openEditAddressDialog(dialog: MatDialog,address:Address){
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass= "modal-panel";
  config.backdropClass="backdrop-modal-panel";

  config.data ={ ...address};
  const dialogRef= dialog.open(AddressEditComponent,config);

  return dialogRef.afterClosed();
}
