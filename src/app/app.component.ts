import { Component, OnInit } from '@angular/core';
import { LayoutService } from './services/layout.service';
import { TodoService } from './services/todo.service';
import { DarkModeService } from './services/dark-mode.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = $localize`:@@appTitle:todo list`;
  isDarkMode: boolean = false;
  isSidenavOpen: boolean = false;

  isLoginWindowOpen = false;

  constructor(
    private todoService: TodoService,
    private darkModeService: DarkModeService,
    private layoutService: LayoutService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(
      (state) => (this.isDarkMode = state)
    );

    this.layoutService.sidenav$.subscribe((state) => {
      this.isSidenavOpen = state;
    });

    this.auth.onAuthStateChanged((user) => {
      if (user) this.isLoginWindowOpen = false;
    });
  }

  getTodos() {
    this.todoService.getMockedTodos();
  }

  clearTodos() {
    this.todoService.clearTodos();
  }

  onDarkModeChange() {
    this.isDarkMode
      ? this.darkModeService.enable()
      : this.darkModeService.disable();
  }

  onLogOut() {
    this.auth.signOut();
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  closeSidenav() {
    this.layoutService.closeSidenav();
  }

  openLoginWindow() {
    this.isLoginWindowOpen = true;
  }
}
