import { Injectable } from '@angular/core';
import { Router , CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MenumasterService } from './menumaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(protected router: Router, private authServ: MenumasterService ) { }

  canActivate(){
	  
	  console.log("((((((((",localStorage.getItem('user'))
  
    if (localStorage.getItem('user')) {
      return true;
    }

  // not logged in so redirect to login page
     this.router.navigate(['/signin']);
  		return false;
  }
}
