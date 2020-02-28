import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{

    getUser():string{
        if(localStorage.getItem('user')==null)        
            return "";
        else{
            return (localStorage.getItem('user'));
        }
    }

    login(user:string, password:string):boolean{
        if(user==='admin' && password==='admin'){
            localStorage.setItem('user',user);
            return true;
        }
        else{
            return false;
        }
           
    }

    logout(){
        localStorage.removeItem('user');
    }
}