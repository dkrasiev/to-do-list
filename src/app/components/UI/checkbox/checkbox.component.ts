import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
  @Input() value: boolean = false;
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  darkmode: boolean = false;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((darkmode) => {
      this.darkmode = darkmode;
    });
  }

  onClick() {
    this.valueChange.emit(!this.value);
  }
}
