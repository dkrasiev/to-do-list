import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent {
  @Input()
  public value: boolean = false;
  @Output()
  private valueChange: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  public darkmode$ = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) {}

  public onClick() {
    this.valueChange.emit(!this.value);
  }
}
