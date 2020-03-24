import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class MenumasterService {

  API_URL = "http://localhost:4201/api/jumpstat";
  existing_appid : string;
  user_mail: string;
 

  constructor(private httpClient: HttpClient) { 

  }

  
  JumpstartUserRegister(payload){
    console.log("register data is",payload)
    return this.httpClient.post(`${this.API_URL}/registerJumpstart`,payload, httpOptions);
  }

  UserAuthenticate(payloadform){
    console.log("login data is",payloadform);
    let payload = {
      "email":payloadform.usernamel,
      "password":payloadform.passwordl
    };
    console.log("payload after json creation ", payload);
    return this.httpClient.post(`${this.API_URL}/authenticateJumpstart`,payload, httpOptions);
  }

  JumpstartfetchUserData(mail){
    console.log("fetch data is",mail)
    return this.httpClient.post(`${this.API_URL}/fetchUserDataJumpstart`,({"email":mail}), httpOptions);
  }

  /* 

  getallMenuMaster(appid){
    return this.httpClient.post(`${this.API_URL}/getallMenuMaster`,({"app_id":appid}),  httpOptions);
  }

  getallProdMaster(){
    return this.httpClient.get(`${this.API_URL}/getallProdMaster`,  httpOptions);
  }

  saveallMenuMaster(savemenulist){
    console.log("New data is",savemenulist)
    return this.httpClient.post(`${this.API_URL}/saveMenuMasterData`,savemenulist, httpOptions);
  }

  updateallMenuMaster(updatemenulist){
    console.log("Existing data is",updatemenulist)
    return this.httpClient.post(`${this.API_URL}/updateMenuMasterData`,updatemenulist, httpOptions);
  }

  UpdateUserStatus(updateuserdata){
    console.log("status update data is",updateuserdata)
    return this.httpClient.post(`${this.API_URL}/UpdateUserStatus`,updateuserdata, httpOptions);
  }*/

  setNewUser(mail){
    this.user_mail = mail;
    console.log("new user mail",this.user_mail);
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
