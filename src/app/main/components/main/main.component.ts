import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { AddPartyMemberComponent } from '../add-party-member/add-party-member.component';
import { DialogRefComponent } from '../dialogRef/dialogRef.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>github-circle-white-transparent</title><path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0 0 10 0z" fill="#FFF" fill-rule="evenodd"/></svg>';

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'github',
      sanitizer.bypassSecurityTrustHtml(this.ICON)
    );
  }

  disabledAnimations(): boolean {
    return localStorage.getItem('animations_disabled') === 'true';
  }

  openConfigDialog(): void {
    this.dialog.open(DialogRefComponent, {
      width: '300px',
    });
  }

  openSnack(): void {
    this._snackBar.open('Come back when you have gathered more demons...');
  }

  openPartyMemberDialog(): void {
    this.dialog.open(AddPartyMemberComponent, {});
  }

  @HostListener('window:resize', ['$event'])
  shouldStayOpen(): boolean {
    return !(window.innerWidth < 1000);
  }

  @HostListener('window:resize', ['$event'])
  isXSmall(): boolean {
    return window.innerWidth <= 350;
  }
}
