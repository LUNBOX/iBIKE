import { Pipe, PipeTransform } from '@angular/core';
import { DigitConvertorProvider } from '../../providers';

@Pipe({ name: 'convertdigit' })
export class ConvertdigitPipe implements PipeTransform
{
  constructor(public digitConvertor: DigitConvertorProvider) { }

  transform(input: any, language = 'en')
  {
    return this.digitConvertor.convertDigit(input, language);
  }
}
