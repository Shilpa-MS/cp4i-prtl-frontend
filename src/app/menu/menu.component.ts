import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenumasterService } from '../services/menumaster.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user:string=null;
  temp_data: string = "";
  user_role: string;
  //enable_flag: boolean = false;
  
  constructor(public MenumasterService:MenumasterService, private ngxService: NgxUiLoaderService) {
     this.user = localStorage.getItem('user');
	 this.MenumasterService.setNewUser(this.user);
	// console.log("localStorage.getRole('role')",localStorage.getRole('role'));
   }

  ngOnInit() {
	if (localStorage.getItem('user'))
	{
		 this.ngxService.start();
	     this.MenumasterService.getNewUser();
	     this.MenumasterService.JumpstartfetchUserData(this.user).subscribe((data: any) => {
            console.log("role.data",data[0].role);
		    this.user_role = data[0].role;
		    // this.enable_flag = true;
			this.ngxService.stop();
			//document.getElementById('navclose').click();
        });
	}
  }
  
  nav(){
	  document.getElementById("navclose").click();
	  console.log("ttttttt",document.getElementById("navclose"));
  }

  logout(){
    localStorage.removeItem('user');
    this.MenumasterService.setNewUser(this.temp_data);
	this.MenumasterService.setNewUserRole('');
	this.user = '';
  }

}
