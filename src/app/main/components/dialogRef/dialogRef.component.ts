import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
      this.selectedOption.push('sound_enabled');
    }

    const localAnimationConfig = localStorage.getItem('animations_disabled');
    if (localAnimationConfig === 'true') {
      this.selectedOption.push('animations_disabled');
    }

    const localVolume = localStorage.getItem('sound_volume');
    this.volume = Number(localVolume) * 100;
  }

  onValueChange(event: string[]): void {
    if (event.includes('sound_enabled')) {
      localStorage.setItem('sound_enabled', 'true');
    } else {
      localStorage.setItem('sound_enabled', 'false');
    }

    if (event.includes('animations_disabled')) {
      localStorage.setItem('animations_disabled', 'true');
    } else {
      localStorage.setItem('animations_disabled', 'false');
    }
  }

  onVolumeChange(event: number): void {
    localStorage.setItem('sound_volume', (event / 100).toString());
  }
}
