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

  index1_jumpstart = 0;
  index2_jumpstart = 0;
  
  
  ngOnInit() {
     this.getUser();
  }
  
  result(event,a,user){
	  console.log("rrrrrr",event,a);
	  if ( a == 'jumpstart')
	  {
        if (event.target.checked == true)
		{
		  user.access[0].jumpstart = true;
        }else{
			user.access[0].jumpstart = false;
		}
      }
      if ( a == 'assessment')
	  {
        if (event.target.checked == true)
		{
		  user.access[1].assessment = true;
        }else{
		  user.access[1].assessment = false;
		}
      }	
	  if ( a == 'integration')
	  {
        if (event.target.checked == true)
		{
		  user.access[2].integration = true;
        }else{
		  user.access[2].integration = false;
		}
      }
	  if ( a == 'oneclick')
	  {
        if (event.target.checked == true)
		{
		  user.access[3].oneclick = true;
        }else{
		  user.access[3].oneclick = false;
		}
      }
	  if ( a == 'multicloud')
	  {
        if (event.target.checked == true)
		{
		  user.access[4].multicloud = true;
        }else{
		  user.access[4].multicloud = false;
		}
      }
      console.log("selected",user);	  
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
         console.log("userdata data is admin",this.userdata[1].access);
		 this.userdata.forEach(userFulldata => {
			//console.log("jkjjkkllk",userFulldata.access,userFulldata.status);
               if(userFulldata.user_status == "pending") {
                  this.UserPendingData[this.index1_jumpstart] = userFulldata;
                  this.index1_jumpstart++;
				 // console.log("pending",this.UserPendingData);
				  this.enable_flag = true;
               }
		        if(userFulldata.user_status == "approved" || userFulldata.user_status == "rejected") {
                  this.UserHistoryData[this.index2_jumpstart] = userFulldata;
			      this.index2_jumpstart++;
				  //console.log("approved",this.UserHistoryData);
				  this.enable_flag1 = true;
               } 			   
      });
	  this.ngxService.stop();
   });	  
  }
  
  /* statusUpdate(){	  
	  this.userdata. = 'in progress';	  
	  this.menuService.UpdateUserStatus(this.userdata).subscribe((data: any) => {     
          //console.log("userstatus is", this.userdata);
        });   
  } */
  
  inputselect(userselectdata){
	this.emailId = userselectdata.email;
	console.log("emailId data", this.emailId);
  }
  
  approve(userapproveData){
	  userapproveData.user_status = "approved"; 	
      /* if (userapproveData.access[1].assessment == true)
	  {
		  userapproveData.app_id = '11';
	  } else {
		  userapproveData.app_id = '';
	  } */
	  console.log("approved data is", userapproveData);
	  this.menuService.UpdateUserStatus(userapproveData).subscribe((data: any) => {     
          //console.log("userdata approve data is admin",this.userdata,userapproveData);
		  this.getUser();
		  this.enable_flag = true;
        }); 
	  if(this.enable_flag == true)
	     this.approvedsendmail(userapproveData.email); 
  }
  
  reject(userrejectData){
	  userrejectData.user_status = "rejected";
	  this.menuService.UpdateUserStatus(userrejectData).subscribe((data: any) => {     
          //console.log("userdata approve data is admin",this.userdata,userrejectData);
		  this.getUser();
		  this.enable_flag1 = true;
        }); 
	  if(this.enable_flag == true)	 
	     this.rejectedsendmail(userrejectData.email);
  }
  
}
