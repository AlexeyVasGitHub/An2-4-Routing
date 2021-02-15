import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CustomPreloadingStrategyService, MessagesService } from './core';
import { SpinnerService } from './widgets';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: { [key: string]: Subscription } = {};

  constructor(
    public messagesService: MessagesService,
    private router: Router,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService,
    private titleService: Title,
    private metaService: Meta) {
  }

  ngOnInit() {
    console.log(
      `Preloading Modules: `,
      this.preloadingStrategy.preloadedModules
    );
    this.setPageTitles();
  }

  ngOnDestroy() {
    this.sub.navigationEnd.unsubscribe();
  }

  onActivate($event: any, routerOutlet: RouterOutlet) {
    console.log('Activated Component', $event, routerOutlet);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet) {
    console.log('Deactivated Component', $event, routerOutlet);
  }

  onDisplayMessages(): void {
    this.router.navigate([{outlets: {messages: ['messages']}}]);
    this.messagesService.isDisplayed = true;
  }

  private setPageTitles() {
    this.sub.navigationEnd = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe(
        data => {
          this.titleService.setTitle(data.title);
        }
      );
  }
}
