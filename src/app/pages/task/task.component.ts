import { CommonModule, Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../core/services/task/task.service';
import { ITask } from '../../core/models/interface/task.interface';
import { ActivatedRoute } from '@angular/router';
import {FilterTaskPipe} from '../../pipes/filter-task.pipe'
import { MatDialog } from '@angular/material/dialog';
import { AddTaskFormComponent } from '../../components/add-task-form/add-task-form.component';

@Component({
  selector: 'app-task',
  imports: [
    NgFor,
    MatListModule,
    MatCardModule,
    CommonModule,
    FilterTaskPipe,
    MatButtonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  tasks: ITask[] | null = null
  projectId: string = ''  

  constructor(
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

  openDialog() {
      const dialogRef = this.dialog.open(AddTaskFormComponent, {
        width: '600px',
        height: '400px'
      })
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('ok')
        }
      })
    }
}
