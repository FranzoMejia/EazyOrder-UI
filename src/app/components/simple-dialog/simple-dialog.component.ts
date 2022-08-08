import { Dialog } from './../../model/dialog.model';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent implements OnInit {

  tittle:String;
  message:String;

  form = this.fb.group({
    tittle:[this.dialog.tittle],
    message: [this.dialog.message,Validators.required]
  });

  @Output() submitClicked = new EventEmitter<any>();
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public dialog:Dialog, private dialogRef:MatDialogRef<SimpleDialogComponent>) {
    this.tittle=dialog.tittle;
    this.message=dialog.message;
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();

  }

  save(){
    if(this.form.valid)
    {
        this.dialog=this.form.value;
        this.submitClicked.emit(this.dialog);
        this.dialogRef.close();
    }
  }

}
