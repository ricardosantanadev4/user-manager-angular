import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgClass, MatIconModule, RouterModule, MatRippleModule, ToolbarComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  menuSelected = '';
  linkSelected = '';
  activeSubMenu: string | null = null;
  clickSubmenu: string | null = null;
  isSidenavClose!: boolean;

  constructor(private router: Router) {
  }

  userLogout() {
    this.router.navigate(['/auth/login']);
  }

  userToogleSidenav() {
    this.isSidenavClose = !this.isSidenavClose;
  }

  toggleSubMenu(menu: string) {
    this.menuSelected = menu;
    if (this.activeSubMenu === menu) {
      this.activeSubMenu = null;
    } else {
      this.activeSubMenu = menu;
    }
  }

  toogleSubmenuMenu(subMenu: string) {
    if (this.clickSubmenu === subMenu) {
      this.clickSubmenu = null;
    } else {
      this.clickSubmenu = subMenu;
    }
  }

  navigateTo(route: string) {
    this.toogleSidenav('clickMenuLinkSideNav');
    this.linkSelected = route;
    this.router.navigate([`${route}`]);
  }

  toogleSidenav(userAction: string) {
    this.isSidenavClose = !this.isSidenavClose;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target ? event.target.innerWidth : event;
    this.isSidenavClose = width < 577;
  }
}
