import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task';

@Pipe({
  name: 'sortName',
  pure: true, // With this value set to false, we have inpure pipe and angular need to constantly refresh this functionality - bad performance
})
export class SortNamePipe implements PipeTransform {
  transform(value: Array<Task>): Array<Task> {
    return value.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else return -1;
    });
  }
}
