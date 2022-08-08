import { Product } from './../../../model/product.module';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';




@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  description: string;
  id;
  form = this.fb.group({
    id:[this.product.id],
    name: [this.product.name,Validators.required],
    description: [this.product.description,Validators.required],
    price: [this.product.price,Validators.required],
  });

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private product:Product, private dialogRef:MatDialogRef<ProductDialogComponent>,private dashboardService: DashboardService,) {

    this.description = product.description;
    this.id = product.id;
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

export function openEditProductDialog(dialog: MatDialog,product:Product){
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass= "modal-panel";
  config.backdropClass="backdrop-modal-panel";

  config.data ={ ...product};
  const dialogRef= dialog.open(ProductDialogComponent,config);

  return dialogRef.afterClosed();
}
