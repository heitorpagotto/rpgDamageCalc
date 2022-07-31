import { EElementTypes } from './../models/all-enums';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumConversion',
})
export class SkillElementEnumConversion implements PipeTransform {
  transform(value: number): string {
    return EElementTypes[value];
  }
}
