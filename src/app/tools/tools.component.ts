import { Component, OnInit } from '@angular/core';
import { MenumasterService } from './../services/menumaster.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
	userdata= [];
	user: string;
	datafoundFlag: boolean= false; 

  constructor(public menuService: MenumasterService, private ngxService: NgxUiLoaderService) {
    this.user = localStorage.getItem('user');
	 this.menuService.setNewUser(this.user);
 }

  ngOnInit() {
	this.ngxService.start();
	this.menuService.JumpstartfetchUserData(this.menuService.getNewUser()).subscribe((data: any) => {
	  this.datafoundFlag = true;
      this.userdata = data[0].access;
      console.log("userdata data is",this.userdata);
	  
    });
    this.ngxService.stop();	
  }
  
  alertcall(){
	  alert('You do not have access to it.Please contact admin!');
  }

}
