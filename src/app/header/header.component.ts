import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenumasterService } from './../services/menumaster.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user:string=null;
  
  constructor(public authService:AuthService,public menuService: MenumasterService) {
    this.user = localStorage.getItem('user');
	console.log("userdata is",this.user);
	 this.menuService.setNewUser(this.user);
   }

  ngOnInit() {
    if (localStorage.getItem('user'))
	{
		 //this.ngxService.start();
	     this.menuService.getNewUser();
		 this.menuService.JumpstartfetchUserData(this.user).subscribe((data: any) => {
			this.menuService.setUserName(data[0].username);
			console.log("username is",data);
	   });
	}
  }

  

  logout(){
    this.authService.logout();
  }

}
