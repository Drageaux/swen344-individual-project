import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], attr: string, filterOuts: string[]): any {
    return array.filter((item) => filterOuts.indexOf(item[attr]) === -1);
  }

}
