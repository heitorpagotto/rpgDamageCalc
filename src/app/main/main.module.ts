import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { DialogRefComponent } from './components/dialogRef/dialogRef.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { AddPartyMemberComponent } from './components/add-party-member/add-party-member.component';
import { AddMemberSkillComponent } from './components/add-member-skill/add-member-skill.component';
import { SharedModule } from 'src/shared/shared.module';
import { MatRippleModule } from '@angular/material/core';
import { PartyMembersListingComponent } from './components/party-members-listing/party-members-listing.component';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const materialImports = [
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatTooltipModule,
  MatTabsModule,
  MatMenuModule,
  MatDialogModule,
  MatSliderModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [
    MainComponent,
    DialogRefComponent,
    AddPartyMemberComponent,
    AddMemberSkillComponent,
    PartyMembersListingComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    materialImports,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class MainModule {}
