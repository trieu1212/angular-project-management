import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ITask } from '../../models/interface/task.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasksByProjectId(projectId: string):Observable<ITask[] | null> {
    return this.http.get<{[key:string]: ITask}>(`${environment.API_URL}/tasks.json`).pipe(
      map(response => {
        if (!response) return null
        return Object.keys(response).map(key => ({
          ...response[key],
          id:key
        })).filter(task => task.projectId == projectId)
      })
    )
  }
}
