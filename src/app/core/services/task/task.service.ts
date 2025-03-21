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

  addTask(task: Omit<ITask,'id'>):Observable<{name:string}> {
    return this.http.post<{name:string}>(`${environment.API_URL}/tasks.json`,task)
  }

  getDetailTask(id:string): Observable<ITask> {
    return this.http.get<{[key:string]: ITask}>(`${environment.API_URL}/tasks.json`).pipe(
      map(response => {
        const taskKey = Object.keys(response).find(k => k==id)
        const result: ITask = {
          ...response[taskKey || id],
          id: taskKey || '',
        }
        return result
      })
    )
  }

  updateTask(id: string, task: Pick<ITask, 'title' | 'description' | 'status'>): Observable<ITask> {
    return this.http.patch<ITask>(`${environment.API_URL}/tasks/${id}.json`,task)
  }
}
