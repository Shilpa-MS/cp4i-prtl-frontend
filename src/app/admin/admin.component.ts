import { Component, OnInit } from '@angular/core';
import { MenumasterService } from './../services/menumaster.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {
	
	userdata: any;
	UserStat: any;
	emailId: string;
	UserPendingData = [];
	UserHistoryData = [];
	enable_flag:boolean = false;
	enable_flag1:boolean = false;

  constructor(private menuService: MenumasterService, private ngxService: NgxUiLoaderService) { }

  index1 = 0;
  index2 = 0;
  ngOnInit() {
    this.getUser();
  }
  
   approvedsendmail(){
	  
	let mailbody = {
              "to": "xxxx@gmail.com",
              "from": "chris.hembrom@gmail.com",
              "subject": "Registration Approved in Jumpstat",
              "text": "Registration is approved by Admin...Plz check on http://jumpstart-portal-test.mybluemix.net/ ",
              "html": "<html> <a href='https://http://jumpstart-portal-test.mybluemix.net/> check registraion </a></html>"
            
            };
            this.menuService.sendMail(mailbody).subscribe((response) => {
                //console.log("response is",response);
            });
   }
   
  rejectedsendmail(){
   let mailbody = {
              "to": "xxxx@gmail.com",
              "from": "chris.hembrom@gmail.com",
              "subject": "Registration Rejected in Jumpstat",
              "text": "Registration is reected by Admin ",
              "html": "<html> <a href='https://http://jumpstart-portal-test.mybluemix.net/> check registraion </a></html>"
            
            };
            this.menuService.sendMail(mailbody).subscribe((response) => {
                //console.log("response is",response);
            });
   }
  
  getUser(){
	  this.UserStat = this.menuService.getNewUser();
	  this.index1= 0;
	  this.index2= 0;
	  this.ngxService.start();
	  this.menuService.fetchAllUserData().subscribe((data: any) => {
         this.userdata = data;
         //console.log("userdata data is admin",this.userdata);
		 this.userdata.forEach(userFulldata => {
			//console.log("jkjjkkllk",userFulldata,userFulldata.status);
               if(userFulldata.status == "pending") {
                  this.UserPendingData[this.index1] = userFulldata;
                  this.index1++;
				  //console.log("pending",this.UserPendingData);
				  this.enable_flag = true;
               }
		        if(userFulldata.status == "approved" || userFulldata.status == "rejected") {
                  this.UserHistoryData[this.index2] = userFulldata;
			      this.index2++;
				  //console.log("approved",this.UserHistoryData);
				  this.enable_flag1 = true;
               } 			   
      });
	  this.ngxService.stop();
   });	  
  }
  
  statusUpdate(){
	  
	  this.userdata.status = 'in progress';	  
	  this.menuService.UpdateUserStatus(this.userdata).subscribe((data: any) => {     
          //console.log("userstatus is", this.userdata);
        }); 
  
  }
  
  inputselect(userselectdata){
    console.log("admin data", userselectdata);
	this.emailId = userselectdata.email;
	/* this.userdata.forEach(element => {
          
   }); */
  }
  
  approve(userapproveData){
	  userapproveData.status = "approved";	  
	  this.menuService.UpdateUserStatus(userapproveData).subscribe((data: any) => {     
          //console.log("userdata approve data is admin",this.userdata,userapproveData);
		  this.getUser();
		  this.enable_flag = true;
        }); 
	  if(this.enable_flag == true)
	     this.approvedsendmail();
  }
  
  reject(userrejectData){
	  userrejectData.status = "rejected";
	  this.menuService.UpdateUserStatus(userrejectData).subscribe((data: any) => {     
          //console.log("userdata approve data is admin",this.userdata,userrejectData);
		  this.getUser();
		  this.enable_flag1 = true;
        }); 
	  if(this.enable_flag == true)	 
	     this.rejectedsendmail();
  }

}
