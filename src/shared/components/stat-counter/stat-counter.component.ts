import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stat-counter',
  templateUrl: './stat-counter.component.html',
  styleUrls: ['./stat-counter.component.css'],
})
export class StatCounterComponent implements OnInit {
  @Input()
  public statLabel: string;

  @Input()
  public statValue: number;

  @Input()
  public disableAddButton: boolean;

  get shoudDisableRemoveButton(): boolean {
    console.log(this.currentStat, 'current');
    console.log(this.statValue, 'input');
    return this.statValue === this.currentStat;
  }

  get shoudDisableAddButton(): boolean {
    return this.currentStat === 40;
  }

  @Output()
  public statValueChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public statValueChangeType: EventEmitter<OperationType> = new EventEmitter<OperationType>();

  public currentStat: number;
  constructor() {}

  ngOnInit(): void {
    this.currentStat = this.statValue;
  }

  public StatValueChange(operation: OperationType) {
    switch (operation) {
      case 'minus':
        this.currentStat--;
        this.statValueChangeType.emit('minus');
        break;
      case 'plus':
        this.currentStat++;
        this.statValueChangeType.emit('plus');
        break;
    }
    this.statValueChange.emit(this.currentStat);
  }
}

type OperationType = 'minus' | 'plus';
