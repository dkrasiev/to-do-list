import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class ModalComponent implements OnInit {
  @Input() state: boolean = false;
  @Output() stateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() title: string = 'modal window';

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.state = false;
    this.stateChange.emit(this.state);
  }
}
