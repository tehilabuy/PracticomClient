import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Subject } from "rxjs/internal/Subject";
import { environment } from "src/environments/environment";
import Child from "src/models/Child";
import User from "src/models/User";

@Injectable({
  providedIn: 'root'
})
export default class UserService {
  currentUser = new BehaviorSubject<{ UserId: string, UserName: string, UserFamilyName: string, HMO: String, UserBirthday: Date, Gender: string, ChildrenOfParent: Child[] }>(null);
  constructor(public http: HttpClient) { }
  routeUrl = `${environment.baseUrl}/User`;

  Post(u: User) {
    const uu={ userName: u.UserName,
    userFamilyName:u.UserFamilyName,
    userId: u.UserId.toString(),
    userBirthday: u.UserBirthday,
    hmo: u.HMO,
    gender:u.Gender,
    childrenOfParent:[]
     }
     console.log(uu)
    return this.http.post<User>(`${this.routeUrl}`, uu);
  }
 
  saveUser(user: User) {
    this.currentUser.next(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
  saveInStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  getFromStorage() {

    let u = localStorage.getItem("user");
    if (u == null) {
      let res = new User(null, null, null, null, null,
        null, null);
      return res;

    }
    return JSON.parse(u);
  }
  removeFromStorage() {
    localStorage.removeItem("user");
  }

}
