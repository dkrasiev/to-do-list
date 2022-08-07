import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  @Input() title: string = 'title';
  @Input() titleAlign: string = 'left';
  @Input() titleSize: string = '16px';

  constructor() {}

  ngOnInit(): void {}
}
