import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillElementEnumConversion } from './pipe/skill-element-enum-conversion.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SkillElementEnumConversion],
  exports: [SkillElementEnumConversion],
})
export class SharedModule {}
