import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/project.service';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { IProject } from '../../core/models/interface/project.interface';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectFormComponent } from '../../components/add-project-form/add-project-form.component';
import { Router } from '@angular/router';
import { TaskService } from '../../core/services/task/task.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-project',
  imports: [
    MatButtonModule,
    MatListModule,
    NgFor,
    MatIconModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  projects: IProject[] | null = null
  userId: string = ''
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService, 
    private dialog: MatDialog, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProjects()  
    const user: any = localStorage.getItem('user') 
    this.userId = user.uid  
  }

  fetchProjects() {
    this.projectService.getProject().subscribe(data => {
      this.projects = data
    }) 
  }

  deleteProject(event:Event,id:string){
    event.stopPropagation()
    const isConfirmed = window.confirm("Do you want to delete this project?")
    if(isConfirmed) {
      this.projectService.deleteProject(id).pipe(
        switchMap(res => {
          if(res) {
            return this.taskService.deleteTasksOfProject(id)
          }
          return of(null)
        })
      ).subscribe({
        next: () => {
          alert('Delete project successfully!')
          this.fetchProjects()
        },
        error: (err) => {
          alert('Failed!')
        }
      })
    } else {
      return
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProjectFormComponent, {
      width: '600px',
      height: '400px'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const prj:Omit<IProject,"id"> = {
          name: result.name,
          description:result.description || '',
          memberIds: result.memberIds,
          ownerId: this.userId || '',
          createdAt: new Date()
        }
        this.projectService.saveProject(prj).subscribe((res) => {
          this.fetchProjects()
        })
      }
    })
  }

  clickProject(id:string) {
    this.router.navigate([`project/${id}`])
  }
}
