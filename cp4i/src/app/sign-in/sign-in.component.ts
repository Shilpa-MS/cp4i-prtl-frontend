import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenumasterService } from './../services/menumaster.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { resetFakeAsyncZone } from '../../../node_modules/@angular/core/testing';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  usernamel:string;
  passwordl:string;
  username:string;
  email: string;
  companyname: string;
  designation: string;
  password: string;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  loginData: any;
  userdata: any;

  constructor(private authService:AuthService, private router:Router,private menuService: MenumasterService,private fb: FormBuilder, private fm: FormsModule) { 

    this.registrationForm = this.fb.group(
      {
        'username': [null, Validators.required],
        'email': [null, Validators.required],
        'companyname': [null, Validators.required],
        'designation': [null, Validators.required],
        'password': [null, Validators.required]
      });

      this.loginForm = this.fb.group(
        {
          'usernamel': [null, Validators.required],
          'passwordl': [null, Validators.required]
        });
  }

  

  login(formvalue){
    console.log("formvalue ",formvalue);
    /* if(this.authService.login(formvalue.user, formvalue.password)){
      this.router.navigateByUrl('/');
    }
    else{
      alert("Wrong UserName/Password");
    } */
    this.menuService.UserAuthenticate(formvalue).subscribe((data: any) => {
		  if(data.status== '200'){
		  console.log("inside if");
	  alert(data.message);
	  }
      console.log(data," data");
      this.loginData = data.xuser[0];
	  console.log("this.loginData ",this.loginData);
	
      console.log("application data is",this.loginData);
      console.log("newUserFlag2222",this.loginData.email);
      this.menuService.setNewUser(this.loginData.email);
      this.menuService.getNewUser();
      this.menuService.setUserappId(this.loginData.app_id);
      this.router.navigate(['/home']);
      this.loginForm.reset();
	  
	  
    });
  }
  registration(regFormValue){
    console.log("formvalue ",regFormValue);
   

    this.menuService.JumpstartfetchUserData(regFormValue.email).subscribe((data: any) => {
      console.log("hhihioio",regFormValue.email,data,data.length);
	  
      if(data.length <= 0 )
      {
        this.menuService.JumpstartUserRegister(regFormValue).subscribe((data: any) => {
          console.log("registration data is",data.ops[0]);
          console.log("newUserFlag resig",data.ops[0].email);
          this.menuService.setNewUser(data.ops[0].email);
          this.menuService.setUserappId(data.ops[0].app_id);
          this.router.navigate(['/home']);
        this.registrationForm.reset;
      
        });
      } else
      {
        alert("user is already present")
      }
  });
  }

  ngOnInit() {
  }

}
