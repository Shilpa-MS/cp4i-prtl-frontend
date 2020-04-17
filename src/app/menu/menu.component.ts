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
  constructor(public MenumasterService:MenumasterService) {
     this.user = localStorage.getItem('user');
	 this.MenumasterService.setNewUser(this.user);
   }

  ngOnInit() {
	  //this.MenumasterService.getNewUser();
  }

  logout(){
    localStorage.removeItem('user');
    this.MenumasterService.setNewUser(this.temp_data);
  
}

}
