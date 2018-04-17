import {Pipe} from "@angular/core";

@Pipe({
  name: "sortBy"
})
export class SortByPipe {
  transform(array: any[], attr: string, order: string = 'ascending'): any[] {
    array.sort((a: any, b: any) => {
      if (a[attr] < b[attr]) {
        return -1;
      } else if (a[attr] > b[attr]) {
        return 1;
      } else {
        return 0;
      }
    });
    if (order == 'descending') {
      return array.reverse();
    } else {
      return array;
    }
  }
}
