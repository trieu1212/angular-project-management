import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IProject } from '../../models/interface/project.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProject(): Observable<IProject[] | null> {
    return this.http.get<{[key: string]: IProject}>(`${environment.API_URL}/projects.json`).pipe(
      map(
        (res) => {
          if(!res) return null
          return Object.keys(res).map((k) => ({
            ...res[k],
            id:k
          }))
        }
      )
    )
  }

  saveProject(project: Omit<IProject, 'id'>):Observable<{name:string}> {
    return this.http.post<{name: string}>(`${environment.API_URL}/projects.json`, project)
  }

  getDetailProject(id:string): Observable<IProject> {
    return this.http.get<{[key: string]: IProject}>(`${environment.API_URL}/projects.json`).pipe(
      map(response => {
        const prjKey = Object.keys(response).find(k => k == id)
        const result : IProject = {
          ...response[prjKey || id],
          id:prjKey || id,
        }
        return result
      })
    )
  }

  deleteProject(id:string) : Observable<{name:string}> {
    return this.http.delete<{name:string}>(`${environment.API_URL}/projects/${id}.json`)
  }
}
