import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import UserService from '../Services/UserService.Services';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit, OnDestroy {

  user = null;
  sub: Subscription;
  constructor(public userService: UserService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit(): void {
    this.sub = this.userService.currentUser.subscribe(succ => {
      this.user = this.userService.getFromStorage()
    })

  }
}
