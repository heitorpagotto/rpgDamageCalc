import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillElementEnumConversion } from './pipe/skill-element-enum-conversion.pipe';
import { StatCounterComponent } from './components/stat-counter/stat-counter.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [SkillElementEnumConversion, StatCounterComponent],
  exports: [SkillElementEnumConversion, StatCounterComponent],
})
export class SharedModule {}
