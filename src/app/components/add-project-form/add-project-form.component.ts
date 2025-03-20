import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { UserService } from '../../core/services/user/user.service';
import { IUser } from '../../core/models/interface/user.interface';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-project-form',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-project-form.component.html',
  styleUrl: './add-project-form.component.scss'
})
export class AddProjectFormComponent implements OnInit {
  projectForm : FormGroup
  users: IUser[] | null = null

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<AddProjectFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      memberIds: [[]]
    })
  }

  ngOnInit(): void {
      this.getUser()
  }

  saveProject() {
    if(this.projectForm.valid) {
      this.dialogRef.close(this.projectForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getUser() {
    return this.userService.getAllUser().subscribe(
      data => this.users = data
    )
  }
}
