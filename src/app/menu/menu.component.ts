import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenumasterService } from '../services/menumaster.service';

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
  
  constructor(public MenumasterService:MenumasterService) {
     this.user = localStorage.getItem('user');
	 this.MenumasterService.setNewUser(this.user);
	// console.log("localStorage.getRole('role')",localStorage.getRole('role'));
   }

  ngOnInit() {
	  this.MenumasterService.getNewUser();
	  this.MenumasterService.JumpstartfetchUserData(this.user).subscribe((data: any) => {
         console.log("role.data",data[0].role);
		 this.user_role = data[0].role;
		// this.enable_flag = true;
      });
  }

  logout(){
    localStorage.removeItem('user');
    this.MenumasterService.setNewUser(this.temp_data);
	this.MenumasterService.setNewUserRole('');
  }

}
