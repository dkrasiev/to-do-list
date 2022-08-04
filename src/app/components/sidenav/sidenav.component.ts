import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  state: boolean = false;

  constructor(
    private layoutService: LayoutService,
    public darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.layoutService.sidenav$.subscribe((state) => {
      this.state = state;
    });
  }

  close() {
    this.layoutService.close();
  }
}
