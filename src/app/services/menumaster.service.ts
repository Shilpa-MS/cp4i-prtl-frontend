import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class MenumasterService {
  API_URL = environment.apiUrl;
  user_role: string;
  user_mail: string;
  name: string;

  constructor(private httpClient: HttpClient) {}

  JumpstartUserRegister(payload) {
    return this.httpClient.post(
      `${this.API_URL}/registerJumpstart`,
      payload,
      httpOptions
    );
  }

  UserAuthenticate(payloadform) {
    console.log("Backend API URL: ", this.API_URL);
    let payload = {
      email: payloadform.usernamel,
      password: payloadform.passwordl,
    };

    return this.httpClient.post(
      `${this.API_URL}/authenticateJumpstart`,
      payload,
      httpOptions
    );
  }

  JumpstartfetchUserData(mail) {
    console.log("fetch jumpstart user data is", mail);
    return this.httpClient.post(
      `${this.API_URL}/fetchUserDataJumpstart`,
      { email: mail },
      httpOptions
    );
  }

  UpdateUserStatus(updateuserdata) {
    console.log("status update data is", updateuserdata);
    return this.httpClient.post(
      `${this.API_URL}/UpdateUserStatus`,
      updateuserdata,
      httpOptions
    );
  }

  fetchAllUserData() {
    return this.httpClient.get(`${this.API_URL}/fetchAllUserData`, httpOptions);
  }

  fetchSecurityQues() {
    return this.httpClient.get(
      `${this.API_URL}/fetchUserSecurityQues`,
      httpOptions
    );
  }

  compareSecurityQuesforuser(payloadform) {
    console.log("payload after json creation ", payloadform);
    return this.httpClient.post(
      `${this.API_URL}/compareSecurityQuesforuser`,
      payloadform,
      httpOptions
    );
  }

  UpdateUserPassword(updateuserpassword) {
    console.log("status update data is", updateuserpassword);
    return this.httpClient.post(
      `${this.API_URL}/UpdateUserPassword`,
      updateuserpassword,
      httpOptions
    );
  }

  sendMail(data) {
    console.log("mail details is", data);
    return this.httpClient.post(`${this.API_URL}/sendmail`, data, httpOptions);
  }

  setNewUser(mail) {
    this.user_mail = mail;
    console.log("new user mail", this.user_mail, localStorage.getItem("user"));
  }

  getNewUser() {
    return this.user_mail;
  }

  setNewUserRole(role) {
    this.user_role = role;
    console.log("new user flag", this.user_role);
  }

  getNewUserRole() {
    return this.user_role;
  }

  fetchAllAssmntUserData() {
    return this.httpClient.get(
      `${this.API_URL}/fetchAllAssmntUserData`,
      httpOptions
    );
  }

  fetchUserAssmntData(mail) {
    console.log("fetch data is", mail);
    return this.httpClient.post(
      `${this.API_URL}/fetchUserAssmntData`,
      { email: mail },
      httpOptions
    );
  }

  UpdateAssmntUserStatus(updateuserdata) {
    console.log("Assessment status update data is", updateuserdata);
    return this.httpClient.post(
      `${this.API_URL}/UpdateAssmntUserStatus`,
      updateuserdata,
      httpOptions
    );
  }

  setUserName(uname) {
    this.name = uname;
    console.log("new user name", this.name);
  }

  getUserName() {
    return this.name;
  }
}
