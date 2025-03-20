import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/project.service';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { IProject } from '../../core/models/interface/project.interface';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectFormComponent } from '../../components/add-project-form/add-project-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [
    MatButtonModule,
    MatListModule,
    NgFor
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  projects: IProject[] | null = null
  constructor(private projectService: ProjectService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.fetchProjects()  
  }

  fetchProjects() {
    this.projectService.getProject().subscribe(data => {
      this.projects = data
    }) 
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProjectFormComponent, {
      width: '600px',
      height: '400px'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.saveProject(result).subscribe((res) => {
          this.fetchProjects()
        })
      }
    })
  }

  clickProject(id:string) {
    this.router.navigate([`project/${id}`])
  }
}
