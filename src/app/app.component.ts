import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { LayoutService } from './services/layout.service';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = $localize`:@@appTitle:todo list`;
  isDarkMode: boolean = false;
  isSidenavOpen: boolean = false;

  constructor(
    private todoService: TodoService,
    private darkModeService: DarkModeService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(
      (state) => (this.isDarkMode = state)
    );

    this.layoutService.sidenav$.subscribe((state) => {
      this.isSidenavOpen = state;
    });

    if (!window.localStorage.getItem('loaded-before')) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkModeService.enable();
      } else {
        this.darkModeService.disable();
      }
    }

    window.localStorage.setItem('loaded-before', 'true');
  }

  loadTodos() {
    this.todoService.loadTodos().subscribe();
  }

  clearTodos() {
    this.todoService.clearTodos();
  }

  onDarkModeChange() {
    this.isDarkMode
      ? this.darkModeService.enable()
      : this.darkModeService.disable();
  }

  toggleSidenav() {
    this.layoutService.toggle();
  }
}
