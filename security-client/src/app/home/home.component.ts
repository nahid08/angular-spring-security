import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import {map, mergeMap, Subscription, switchMap, timer} from 'rxjs';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  content?: string;
  timerSubscription?: Subscription;

  constructor(private userService: UserService) {};

  ngOnInit(): void {
    
      this.timerSubscription = timer(0, 1000).pipe(
        mergeMap(() => {
          return this.userService.getPublicContent();
        })
      ).subscribe(data => {
        this.content = data;
      });

  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

}
