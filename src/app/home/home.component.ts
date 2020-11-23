import { Component, OnInit } from '@angular/core';
import { MenumasterService } from '../services/menumaster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	temp_mail: any;

  constructor(public MenumasterService:MenumasterService) { 
    this.temp_mail = this.MenumasterService.getNewUser();
	this.MenumasterService.setNewUser(this.temp_mail);
	console.log("this.MenumasterService.getNewUser();",this.MenumasterService.getNewUser());
  }

  ngOnInit() {
	  
	this.temp_mail = this.MenumasterService.getNewUser();
	this.MenumasterService.setNewUser(this.temp_mail);
	console.log("this.MenumasterService.getNewUser();",this.MenumasterService.getNewUser());
  }

}
