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
	assmnt_userdata: any;
	assmnt_UserStat: any;
	assmnt_emailId: string;
	assmnt_UserPendingData = [];
	assmnt_UserHistoryData = [];
	assmnt_enable_flag:boolean = false;
	assmnt_enable_flag1:boolean = false;

  constructor(private menuService: MenumasterService, private ngxService: NgxUiLoaderService) { }

  index1_jumpstart = 0;
  index2_jumpstart = 0;
  
  index1_assmnt = 0;
  index2_assmnt = 0;
  
  ngOnInit() {
     this.getUser();
	 this.fetchAllAssmntUserData();
  }
  
   approvedsendmail(approvemail){
	  
	let mailbody = {
              "to": approvemail,
              "from": "chris.hembrom@gmail.com",
              "subject": "Registration Approved",
              "text": "Registration is approved by Admin...Plz check on http://jumpstart-portal-test.mybluemix.net/ ",
              "html": "<html> <a href='https://http://jumpstart-portal-test.mybluemix.net/> check registraion </a></html>"
            
            };
            this.menuService.sendMail(mailbody).subscribe((response) => {
                //console.log("response is",response);
            });
   }
   
  rejectedsendmail(rejectmail){
   let mailbody = {
              "to": rejectmail,
              "from": "chris.hembrom@gmail.com",
              "subject": "Registration Rejected",
              "text": "Registration is reected by Admin ",
              "html": "<html> <a href='https://http://jumpstart-portal-test.mybluemix.net/> check registraion </a></html>"
            
            };
            this.menuService.sendMail(mailbody).subscribe((response) => {
                //console.log("response is",response);
            });
   }
  
  getUser(){
	  this.UserStat = this.menuService.getNewUser();
	  this.index1_jumpstart = 0;
	  this.index2_jumpstart = 0;
	  this.UserPendingData = [];
	  this.UserHistoryData = [];
	  
	  this.ngxService.start();
	  this.menuService.fetchAllUserData().subscribe((data: any) => {
         this.userdata = data;
         //console.log("userdata data is admin",this.userdata);
		 this.userdata.forEach(userFulldata => {
			//console.log("jkjjkkllk",userFulldata,userFulldata.status);
               if(userFulldata.status == "pending") {
                  this.UserPendingData[this.index1_jumpstart] = userFulldata;
                  this.index1_jumpstart++;
				  //console.log("pending",this.UserPendingData);
				  this.enable_flag = true;
               }
		        if(userFulldata.status == "approved" || userFulldata.status == "rejected") {
                  this.UserHistoryData[this.index2_jumpstart] = userFulldata;
			      this.index2_jumpstart++;
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
	this.assmnt_emailId = "";
	this.emailId = userselectdata.email;
	console.log("emailId data", this.emailId);
  }
  
  approve(userapproveData){
	  userapproveData.status = "approved";	  
	  this.menuService.UpdateUserStatus(userapproveData).subscribe((data: any) => {     
          //console.log("userdata approve data is admin",this.userdata,userapproveData);
		  this.getUser();
		  this.enable_flag = true;
        }); 
	  if(this.enable_flag == true)
	     this.approvedsendmail(userapproveData.email);
  }
  
  reject(userrejectData){
	  userrejectData.status = "rejected";
	  this.menuService.UpdateUserStatus(userrejectData).subscribe((data: any) => {     
          //console.log("userdata approve data is admin",this.userdata,userrejectData);
		  this.getUser();
		  this.enable_flag1 = true;
        }); 
	  if(this.enable_flag == true)	 
	     this.rejectedsendmail(userrejectData.email);
  }
  
  fetchAllAssmntUserData()
  {
	  this.index1_assmnt = 0;
	  this.index2_assmnt = 0;
	  this.assmnt_UserPendingData = [];
	  this.assmnt_UserHistoryData = [];
	  
	  this.ngxService.start();
	  this.menuService.fetchAllAssmntUserData().subscribe((data: any) => {
         this.assmnt_userdata = data;
         console.log("portal_userdata data is admin",this.assmnt_userdata);
		 this.assmnt_userdata.forEach(userFulldata => {
               if(userFulldata.user_status == "pending") {
                  this.assmnt_UserPendingData[this.index1_assmnt] = userFulldata;
                  this.index1_assmnt++;
				  //console.log("pending",this.UserPendingData);
				  this.assmnt_enable_flag = true;
               }
		        if(userFulldata.user_status == "approved" || userFulldata.status == "rejected") {
                  this.assmnt_UserHistoryData[this.index2_assmnt] = userFulldata;
			      this.index2_assmnt++;
				  //console.log("approved",this.UserHistoryData);
				  this.assmnt_enable_flag1 = true;
               } 			   
      });
	  this.ngxService.stop();
   });
  }
  
  assmnt_inputselect(userselectdata){
	this.emailId = "";
	this.assmnt_emailId = userselectdata.email;
	console.log("assmnt_emailId data", this.assmnt_emailId);
  }
  
  assmnt_approve(userapproveData){
	  userapproveData.user_status = "approved";	  
	  this.menuService.UpdateAssmntUserStatus(userapproveData).subscribe((data: any) => {     
          console.log("assmnt userdata approve data is admin",this.userdata,userapproveData);
		  this.fetchAllAssmntUserData();
		  this.enable_flag = true;
        }); 
	  if(this.enable_flag == true)
	     this.approvedsendmail(userapproveData.email);
  }
  
  assmnt_reject(userrejectData){
	  userrejectData.user_status = "rejected";
	  this.menuService.UpdateAssmntUserStatus(userrejectData).subscribe((data: any) => {     
          console.log("assmnt userdata approve data is admin",this.userdata,userrejectData);
		  this.fetchAllAssmntUserData();
		  this.enable_flag1 = true;
        }); 
	  if(this.enable_flag == true)	 
	     this.rejectedsendmail(userrejectData.email);
  }


}
