import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../core/models/interface/task.interface';

@Pipe({
  name: 'filterTask',
  standalone: true
})
export class FilterTaskPipe implements PipeTransform {

  transform(tasks: ITask[] | null, status: string): ITask[] {
    if(!tasks) return []
    return tasks.filter(task => task.status == status)
  }

}
