import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-counter',
  templateUrl: './stat-counter.component.html',
  styleUrls: ['./stat-counter.component.css'],
})
export class StatCounterComponent {
  @Input()
  public statLabel: string;

  @Input()
  public statValue: number;

  @Input()
  public statValueChange: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  public StatValueChange(operation: OperationType) {
    switch (operation) {
      case 'minus':
        this.statValue--;
        break;
      case 'plus':
        this.statValue++;
        break;
    }
    this.statValueChange.emit(this.statValue);
  }
}

type OperationType = 'minus' | 'plus';
