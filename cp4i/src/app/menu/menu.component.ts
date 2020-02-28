import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user:string=null;
  constructor(private authService:AuthService) {
    this.user = this.authService.getUser();
   }

  ngOnInit() {
  }

}
