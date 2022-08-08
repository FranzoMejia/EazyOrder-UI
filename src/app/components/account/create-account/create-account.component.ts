import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { User } from "src/app/model/user.model";
import { LoginService } from 'src/app/services/login/login.service'


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})


export class CreateAccountComponent implements OnInit {

  model = new User();


  form = this.fb.group({



    name: [this.model.name, [Validators.required,Validators.minLength(5),
    Validators.maxLength(60)]],
    email: [this.model.email, [Validators.email,Validators.required]],
    pwd: [this.model.pwd, [Validators.required,Validators.minLength(5),
      Validators.maxLength(20)]],
    mobileNumber: [this.model.mobileNumber, [Validators.required,Validators.pattern("[0-9 ]{10}")]],
    role: ['user', [Validators.required]],


  });
  disableSubmit=true;

  constructor(private fb: FormBuilder,private loginService: LoginService) {

  }

  ngOnInit(): void {
  }

  get userName() {
    return this.form.controls['name'];
  }

  checkValidStatus(){
    this.disableSubmit=!this.form.valid;
  }

  createUser(model: User) {
    /* this.loginService.validateLoginDetails(this.model).subscribe(
      responseData => {
        //This is for  JWT auth
        window.sessionStorage.setItem("Authorization",responseData.headers.get('Authorization'));
        this.model = <any> responseData.body;
        this.model.authStatus = 'AUTH';
        window.sessionStorage.setItem("userdetails",JSON.stringify(this.model));
        //This is for non JWT auth
        /* let xsrf = this.getCookie('XSRF-TOKEN');
        window.sessionStorage.setItem("XSRF-TOKEN",xsrf);
        this.router.navigate(['dashboard']);
      }, error => {
        console.log(error);
      }); */

      console.log(this.form.valid);
      if(this.form.valid){
        //this.model.name= this.form.value("name");
        this.loginService.createCustomer(this.form.value).subscribe(
          responseData => {
            console.log(responseData);
          }, error => {
            console.log(error);
          });
      }

  }

}
