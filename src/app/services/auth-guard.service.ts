import { Injectable } from '@angular/core';
import { Router , CanActivate } from '@angular/router';
import { MenumasterService } from './menumaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(protected router: Router, private authServ: MenumasterService ) { }

  canActivate(){
	  
	  console.log("((((((((",this.authServ.getNewUser())
  
    if (this.authServ.getNewUser()) {
      return true;
    }

  // not logged in so redirect to login page
     this.router.navigate(['/signin']);
  		return false;
  }
}
