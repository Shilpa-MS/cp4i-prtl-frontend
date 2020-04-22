import { Component, OnInit } from '@angular/core';
import { MenumasterService } from './../services/menumaster.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {
	
	userdata: any;
	UserStat: any;
	emailId: string;

  constructor(private menuService: MenumasterService) { }

  ngOnInit() {
	this.getUser();
  }
  
  getUser(){
	  this.UserStat = this.menuService.getNewUser();
	  this.menuService.fetchAllUserData().subscribe((data: any) => {
      this.userdata = data;
      console.log("userdata data is admin",this.userdata);
   
   });
  }
  
  statusUpdate(){
	  
	  this.userdata.status = 'in progress';	  
	  this.menuService.UpdateUserStatus(this.userdata).subscribe((data: any) => {     
          console.log("userstatus is", this.userdata);
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
          console.log("userdata approve data is admin",this.userdata,userapproveData);
		  this.getUser();
        }); 
	  
  }
  
  reject(userrejectData){
	  userrejectData.status = "rejected";
	  this.menuService.UpdateUserStatus(userrejectData).subscribe((data: any) => {     
          console.log("userdata approve data is admin",this.userdata,userrejectData);
		  this.getUser();
        });
	  
  }

}
