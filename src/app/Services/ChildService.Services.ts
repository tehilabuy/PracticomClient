import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { environment } from "src/environments/environment";
import Child from "src/models/Child";

@Injectable({
    providedIn: 'root'
  })
  export default class ChildService {
    currentChild=new Subject<Child>();
    constructor(public http: HttpClient) { }
    routeUrl = `${environment.baseUrl}/Child`;
    
    Post(u:Child) {
      const child={
        "nameOfChild":u.NameOfChild,
        "birthdayOfChild": u.BirthdayOfChild,
        "idOfChild": u.IdOfChild.toString()
      }
      console.log(child)
        return this.http.post<Child>(`${this.routeUrl}`,child);
      }
      saveUser(child:Child){
      this.currentChild.next(child);
      localStorage.setItem("child",JSON.stringify(child));
      }
      
  }