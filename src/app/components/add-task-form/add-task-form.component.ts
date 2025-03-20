import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-add-task-form',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent implements OnInit {
  taskForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ){
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['To Do'],
    })
  }

  ngOnInit(): void {
      
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
