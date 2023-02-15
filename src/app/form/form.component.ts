import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import Child from 'src/models/Child';
import User from 'src/models/User';
import ChildService from '../Services/ChildService.Services';
import UserService from '../Services/UserService.Services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  user: User=new User("","","","",null,"",null) 
  
  constructor(public userService:UserService,public childService:ChildService) { }
  ifShow=false
  children:Child[]=[]
  oneChild =new Child("","",null)

  saveChanges(user, child, children) {
    this.user = user;
    this.oneChild = child;
    this.children = children;
  }

  ngOnInit(): void {
    this.user=this.userService.getFromStorage();
  }
  ngOnDestroy(): void {
    this.userService.saveInStorage(this.user);
  }
  addChild(){
    this.ifShow=true
    this.children.push(this.oneChild)

  }
  putChild(myForm:Form){
  this.ifShow=false
  //  this.oneChild.NameOfChild="";
  //  this.oneChild.BirthdayOfChild=null;
  //  this.oneChild.IdOfChild="";
   console.log(this.oneChild);
   console.log(this.user);
this.childService.Post(this.oneChild).subscribe();
  console.log(myForm)

  }
  logIn(f){

      console.log('log '+this.user);
      console.log('log '+this.user.UserId);
      this.userService.Post(this.user).subscribe();
      console.log('stor'+this.userService.getFromStorage().UserName);
      this.user.ChildrenOfParent=this.children;

     this.userService.currentUser.next(this.user);
     this.save(f)
    }
   
   save(f) {
     console.log("now save!")
    console.log("len:"+this.user.ChildrenOfParent.length)

    this.userService.Post(this.user);
    for (let i = 0; i < this.user.ChildrenOfParent.length; i++) {
      this.childService.Post(this.user.ChildrenOfParent[i]);
      console.log(this.user);
    }
   
    f.reset();
  }
  isIsraelValidID(Id) {
    let id = String(Id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(Id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array
      .from(id, Number)
      .reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) % 10 === 0;
  }
}
