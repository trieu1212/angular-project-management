import { CommonModule, Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../core/services/task/task.service';
import { ITask } from '../../core/models/interface/task.interface';
import { ActivatedRoute } from '@angular/router';
import {FilterTaskPipe} from '../../pipes/filter-task.pipe'
import { MatDialog } from '@angular/material/dialog';
import { AddTaskFormComponent } from '../../components/add-task-form/add-task-form.component';
import { ProjectService } from '../../core/services/project/project.service';
import { IProject } from '../../core/models/interface/project.interface';
import {formatDate} from '../../core/utils/fomatDate'
import { EditTaskFormComponent } from '../../components/edit-task-form/edit-task-form.component';
@Component({
  selector: 'app-task',
  imports: [
    NgFor,
    MatListModule,
    MatCardModule,
    CommonModule,
    FilterTaskPipe,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  tasks: ITask[] | null = null
  projectId: string = '' 
  project: IProject = {
    id: '',
    name: "",
    description: "",
    ownerId: "",
    memberIds: [],
    createdAt: new Date()
  }
  user: any = localStorage.getItem('user') 
  displayedColumns: string[] = ['title', 'description', 'status', 'createdAt', 'actions'];
  formatDate = formatDate

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id') || ""
      if(this.projectId) {
        this.getTaskByProjectId(this.projectId)
        this.getDetailProject(this.projectId)
      }
    })
  } 

  getBack() {
    this.location.back()
  }

  getTaskByProjectId(projectId: string) {
    this.taskService.getTasksByProjectId(projectId).subscribe(data => {
      this.tasks = data
    })
  }

  getDetailProject(id: string) {
    this.projectService.getDetailProject(id).subscribe(data => {
      this.project = data
    })
  }

  deleteTask(id:string) {
    this.taskService.deleteTask(id).subscribe(data => {
      alert('Delete task successfully!')
      this.getTaskByProjectId(this.projectId)
    })
  }

  openAddDialog() {
      const dialogRef = this.dialog.open(AddTaskFormComponent, {
        width: '600px',
        height: '400px'
      })
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const task: Omit<ITask,'id'> = {
            title: result.title,
            description: result.description || '',
            status: result.status || 'To Do',
            projectId: this.projectId,
            assignee: this.user || "",
            createdAt: new Date()
          }
          this.taskService.addTask(task).subscribe(res => {
            alert('Add task successfully!')
            this.getTaskByProjectId(this.projectId)
          })
        }
      })
    }
  
    openEditDialog(id:string) {
      const dialogRef = this.dialog.open(EditTaskFormComponent, {
        width: '600px',
        height: '400px',
        data: {id}
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const task: Pick<ITask, "title" | "description" | "status"> = {
            title: result.title,
            description: result.description,
            status: result.status
          }
          this.taskService.updateTask(id, task).subscribe(() => {
            alert('Edit task successfully!')
            this.getTaskByProjectId(this.projectId)
          })
        }
      })
    }
}
