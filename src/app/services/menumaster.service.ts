import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class MenumasterService {

  API_URL = environment.apiUrl;
  existing_appid : string;
  user_mail: string;
 

  constructor(private httpClient: HttpClient) { 

  }

  
  JumpstartUserRegister(payload){
    //console.log("register data is",payload)
    return this.httpClient.post(`${this.API_URL}/registerJumpstart`,payload, httpOptions);
  }

  UserAuthenticate(payloadform){
    
    let payload = {
      "email":payloadform.usernamel,
      "password":payloadform.passwordl
    };
    
    return this.httpClient.post(`${this.API_URL}/authenticateJumpstart`,payload, httpOptions);
  }

  JumpstartfetchUserData(mail){
    console.log("fetch data is",mail)
    return this.httpClient.post(`${this.API_URL}/fetchUserDataJumpstart`,({"email":mail}), httpOptions);
  }

 

  setNewUser(mail){
    this.user_mail = mail;
    console.log("new user mail",this.user_mail,localStorage.getItem('user'));
  }


  getNewUser(){
    return this.user_mail;
  }
  

  setUserappId(id){
   this.existing_appid = id;
   console.log("new user flag",this.existing_appid);
  }

  getUserappId(){
    return this.existing_appid;
  } 

 
}
