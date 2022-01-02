import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ref',
  templateUrl: './dialogRef.component.html',
})
export class DialogRefComponent {
  selectedOption: string[] = [];

  volume: number = 100;
  constructor(public dialogRef: MatDialogRef<DialogRefComponent>) {
    const localConfig = localStorage.getItem('sound_enabled');
    if (localConfig === 'true') {
      this.selectedOption = ['sound_enabled'];
    }

    const localVolume = localStorage.getItem('sound_volume');
    this.volume = Number(localVolume) * 100;
  }

  onValueChange(event: string[]): void {
    if (event[0] === 'sound_enabled') {
      localStorage.setItem('sound_enabled', 'true');
    } else {
      localStorage.setItem('sound_enabled', 'false');
    }
  }

  onVolumeChange(event: number): void {
    localStorage.setItem('sound_volume', (event / 100).toString());
  }
}
