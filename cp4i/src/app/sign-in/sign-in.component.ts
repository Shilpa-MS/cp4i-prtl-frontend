import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user:string;
  password:string;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  login(){
    if(this.authService.login(this.user, this.password)){
      this.router.navigateByUrl('/');
    }
    else{
      alert("Wrong UserName/Password");
    }
  }

}
