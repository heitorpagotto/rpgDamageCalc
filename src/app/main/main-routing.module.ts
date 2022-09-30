import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombatComponent } from './components/combat/combat.component';
import { DamageCalculatorComponent } from './components/damage-calculator/damage-calculator.component';
import { MainComponent } from './components/main/main.component';
import { PartyMembersListingComponent } from './components/party-members-listing/party-members-listing.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DamageCalculatorComponent,
      },
      {
        path: 'party',
        component: PartyMembersListingComponent,
      },
      {
        path: 'combat',
        component: CombatComponent,
      },
      {
        path: 'damage-calculator',
        component: PartyMembersListingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
