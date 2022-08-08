import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimpleDialogComponent } from 'src/app/components/simple-dialog/simple-dialog.component';
import { Dialog } from 'src/app/model/dialog.model';
import { Product } from 'src/app/model/product.module';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-addproductorder',
  templateUrl: './addproductorder.component.html',
  styleUrls: ['./addproductorder.component.css']
})
export class AddproductorderComponent implements OnInit {

  tittle:String;
  message:String;
  listProducts:Product[];

  form = this.fb.group({
    tittle:[this.dialog.tittle],
    quantity: [1,Validators.required],
    product:[Validators.required]


  });

  @Output() submitClicked = new EventEmitter<any>();

  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public dialog:Dialog,private dashboardService: DashboardService, private dialogRef:MatDialogRef<SimpleDialogComponent>) {
    this.getProducts();
    this.tittle=dialog.tittle;
    this.message=dialog.message;
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();

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

  save(){
    if(this.form.valid &&  typeof(this.form.value.product)=='number')
    {

        this.dialog.qty=this.form.value.quantity;
        this.dialog.product=this.listProducts.find((obj) => {
          return obj.id === this.form.value.product  } );

        this.dialogRef.close(this.dialog);
    }
  }


}
