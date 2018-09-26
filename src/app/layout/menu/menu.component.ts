import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public appPages = [
    {
      title: 'Home',
      url: '/tabs/(card:card)',
      icon: 'home'
    },
    {
      title: 'Favorite Cards',
      url: '/tabs/(favorite:favorite)',
      icon: 'star'
    }
  ];

  public activePage: any;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {}

  public checkActivePage(page): boolean {

    let activateRoute: boolean;

    if (this._router.isActive(page.url, true)) {
      activateRoute = true;
    } else {
      activateRoute = false;
    }
    return activateRoute;
  }

}
