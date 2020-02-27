import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {
  transform (value: string, args?: any) {
    if (!value)
      return null;

    return value.split(' ').map((str: string) => {
      let reg = /[^a-zA-Z0-9\s]/g;
      str = str.replace(reg, '');
  
      if (str.length === 0)
          return "";
      if (str.length === 1)
          return str.toUpperCase();
  
      let test =  str.substring(0, 1).toUpperCase() +
      str.substring(1, str.length).toLowerCase();
        return test;
      }).join(' ');
  }
}