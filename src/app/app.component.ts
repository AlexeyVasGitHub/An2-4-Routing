import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MessagesService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public messagesService: MessagesService, private router: Router) {
  }

  onActivate($event: any, routerOutlet: RouterOutlet) {
    console.log('Activated Component', $event, routerOutlet);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet) {
    console.log('Deactivated Component', $event, routerOutlet);
  }

  onDisplayMessages(): void {
    this.router.navigate([{outlets: {messages: ['messages']}}]);
    this.messagesService.isDisplayed = true;
  }
}
