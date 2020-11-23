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
  mail: any;
  SecurityQues: any;
  securityfaq_one: string;
  securityanswer_one: string;
  securityfaq_two: string;
  securityanswer_two: string;
  
  userinfo: any;
  userInfoFlag: boolean = false;
  passwordEnableFlag: boolean = false;
  
  answer1:any;
  answer2:any;
  newpassword:any;
  confirmpassword: any;

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
        'password': [null, Validators.required],
		'securityfaq_one': [null, Validators.required],
		'securityanswer_one': [null, Validators.required],
		'securityfaq_two': [null, Validators.required],
		'securityanswer_two': [null, Validators.required]
      });

      this.loginForm = this.fb.group(
        {
          'usernamel': [null, Validators.required],
          'passwordl': [null, Validators.required]
        });
		
	  this.menuService.fetchSecurityQues().subscribe((data: any) => {
         this.SecurityQues = data[0].content;
		 //console.log("SecurityQues",this.SecurityQues);
      });
	  
	  //this.sendmail();
  }
  
  sendmail(mailid){
	  
	let mailbody = {
              "to": mailid,
              "from": "chris.hembrom@gmail.com",
              "subject": "Registration in Jumpstat",
              "text": "Registration is completed successfully ",
              "html": "<html> <a href='https://http://jumpstart-portal-test.mybluemix.net/> check registraion </a></html>"
            
            };
            this.menuService.sendMail(mailbody).subscribe((response) => {
                //console.log("response is",response);
            });
   }

  login(formvalue){
    console.log("inside login");
    
    this.menuService.UserAuthenticate(formvalue).subscribe((data: any) => {
	    if(data.status== '200'){
		    console.log("inside if");
	        //alert(data.message);
	  
            //console.log(data," data");
            this.loginData = data.xuser;
			console.log("this.loginData ",this.loginData);
			
			if((this.loginData.user_status == "approved" && this.loginData.access[0].jumpstart==true) || 
			   (this.loginData.role == 'admin' && this.loginData.access[0].jumpstart==true))
			{
				this.menuService.setNewUser(this.loginData.email);
			    localStorage.setItem('user',this.loginData.email);
                this.menuService.getNewUser();
	            this.menuService.setNewUserRole(this.loginData.role);
				this.menuService.setUserName(this.loginData.username);
				
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
      //console.log(regFormValue.email);
	  
      if(data.length <= 0 )
      {
		
		var payload={
         'username':regFormValue.username,
         'email': regFormValue.email,
         'companyname':regFormValue.companyname,
         'designation':regFormValue.designation,
         'app_id': '11',
         'password':regFormValue.password,
	     'securityfaq_one':regFormValue.securityfaq_one,
	     'securityanswer_one':regFormValue.securityanswer_one,
	     'securityfaq_two':regFormValue.securityfaq_two,
	     'securityanswer_two':regFormValue.securityanswer_two,
         'user_type':'new',
         'status': 'Yet to Start',
         'role':'user',
	     'user_status':'pending',
	     'access': [{'jumpstart':false},{'assessment':false},{'integration':false},{'oneclick':false},{'multicloud':false}],
	     'comment':''
      }

        this.menuService.JumpstartUserRegister(payload).subscribe((data: any) => {
          
          console.log("newUserFlag resig",data.ops[0].email);
          //this.menuService.setNewUser(data.ops[0].email);
          //this.menuService.setUserappId(data.ops[0].app_id);
          this.router.navigate(['/signin']);
		  alert("registered successfully!")
          this.registrationForm.reset();
          this.sendmail(regFormValue.email);
        });
      } else
      {
        alert("user is already present")
      }
  });
  }
  
  mailcheck(id){
	console.log("ggggg",id);
	console.log("mail id is",this.mail);
	  this.menuService.JumpstartfetchUserData(id).subscribe((data: any) => {
      //console.log(data); 
	  
      if(data.length <= 0 )
      {	
        alert("user is not present");		
      } else
      { 
        this.userInfoFlag = true;  
		//console.log("data is",data);
		this.userinfo = data[0];
		
      }
  });
  }
  
  checkans(){
	 // console.log("forgotData is",this.mail,this.answer1,this.answer2)
	  var payload= {
		   "email": this.mail,
		   "securityanswer_one":this.answer1,
		   "securityanswer_two":this.answer2
	    }
	  
	  this.menuService.compareSecurityQuesforuser(payload).subscribe((data: any) => {
	    if(data.status== '200'){
		    console.log("inside if");
	        //alert(data.message);
	  
           // console.log(data," data");
            this.passwordEnableFlag = true;
			this.userInfoFlag = false;
	    }	  
    },
      error => {
        console.log("errro",error);
		if(error.status == '404')
			alert('User does not exist!');
		if(error.status == '401')
			alert('answer incorrect!');
		if(error.status == '500')
			alert('server error!');
		if(error.status == '502')
			alert('secret answer should not be null!');
      });
  }
  
  forgotPassword()
  {
	if(this.newpassword == this.confirmpassword)
	{
	    var updatepasswordData = {
		   "email" : this.mail,
		   "password": this.newpassword
	    }
	 
	    //console.log("forgotData is",this.mail,updatepasswordData);
	    this.menuService.UpdateUserPassword(updatepasswordData).subscribe((data: any) => {     
        //  console.log("userdata approve data is admin",updatepasswordData);
		  alert("Password is reset successfully");
		  this.refresh();
		  document.getElementById("closeModal").click();
        })
	}
     else{
		 alert("password mismatch");
     }		 
  }
  
  refresh(){
	this.userInfoFlag = false;
	this.passwordEnableFlag = false;
    this.mail = "";
	this.answer1 = "";
	this.answer2 = "";
	this.newpassword = "";
	
  }

  

}
