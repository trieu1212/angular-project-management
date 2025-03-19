import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IProject } from '../../models/interface/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProject() {
    return this.http.get<{[id: string]: IProject}>(
      `${environment.API_URL}projects.json`
    )
  }
}
