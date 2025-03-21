import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { TaskService } from '../../core/services/task/task.service';
import { ITask } from '../../core/models/interface/task.interface';

@Component({
  selector: 'app-edit-task-form',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.scss'
})
export class EditTaskFormComponent implements OnInit {
  taskForm: FormGroup
  task:ITask = {
    id: '',
    title: '',
    description: '',
    status: "To Do",
    projectId:'',
    assigneeId: '',
    createdAt: new Date()
  }
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {id:string}
  ) {
    this.taskForm = formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['To Do']
    })
  }

  ngOnInit(): void {
      if (this.data.id) {
        this.getDetailTask(this.data.id)
      }
  }

  getDetailTask(id:string) {
    this.taskService.getDetailTask(id).subscribe(data => {
      this.task = data
      this.taskForm.patchValue({
        title: data.title,
        description: data.description,
        status: data.status
      })
    })
  }

  saveProject() {
    if(this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
