import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenumasterService } from './../services/menumaster.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { resetFakeAsyncZone } from '../../../node_modules/@angular/core/testing';
import { emailValidator } from '../email.validator';

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
	
  }

   ngOnInit() {	   
       console.log("localStorage.removeItem('user');",localStorage.removeItem('user'));
	   this.menuService.setNewUser('');
       localStorage.removeItem('user');	 
       this.menuService.setNewUserRole('');	   
	   this.registrationForm = this.fb.group(
      {
        'username': [null, Validators.required],
	    'email': [null, Validators.compose([Validators.required, emailValidator.strong])],
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
    console.log("inside login");
    
    this.menuService.UserAuthenticate(formvalue).subscribe((data: any) => {
	    if(data.status== '200'){
		    console.log("inside if");
	        //alert(data.message);
	  
            console.log(data," data");
            this.loginData = data.xuser;
			console.log("this.loginData ",this.loginData);
			this.menuService.setNewUser(this.loginData.email);
			localStorage.setItem('user',this.loginData.email);
            this.menuService.getNewUser();
	        this.menuService.setNewUserRole(this.loginData.role);
			if(this.loginData.status == "approved" || this.loginData.role == 'admin')
			{
				
	            if(this.loginData.role == 'user'){
                  this.router.navigate(['/home']);
                }else
                {
                  this.router.navigate(['/admin']);
                }  
                //this.router.navigate(['/home']);
                this.loginForm.reset();
			}
			else{
				alert("User is not Authorized")
			}
	    }
	  
    },
      error => {
        console.log("errro",error);
		if(error.status == '404')
			alert('User does not exist!');
		if(error.status == '401')
			alert('Password incorrect!');
		if(error.status == '500')
			alert('server error!');
      });
  }
  
  registration(regFormValue){ 

    this.menuService.JumpstartfetchUserData(regFormValue.email).subscribe((data: any) => {
      console.log(regFormValue.email);
	  
      if(data.length <= 0 )
      {
        this.menuService.JumpstartUserRegister(regFormValue).subscribe((data: any) => {
          
          console.log("newUserFlag resig",data.ops[0].email);
          this.menuService.setNewUser(data.ops[0].email);
          //this.menuService.setUserappId(data.ops[0].app_id);
          this.router.navigate(['/signin']);
          this.registrationForm.reset();
      
        });
      } else
      {
        alert("user is already present")
      }
  });
  }

  

}
