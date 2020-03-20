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
  constructor(private MenumasterService:MenumasterService) {
   //this.user = this.authService.getUser();
   }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('user');
    this.MenumasterService.setNewUser("");
  
}

}
