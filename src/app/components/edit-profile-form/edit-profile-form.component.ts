import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { IUser } from '../../core/models/interface/user.interface';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-edit-profile-form',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-profile-form.component.html',
  styleUrl: './edit-profile-form.component.scss'
})
export class EditProfileFormComponent implements OnInit {
  profileForm : FormGroup
  user:IUser = {
    id: '',
    name: "",
    email: '',
    projectIds:[]
  }
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {id:string}
  ) {
    this.profileForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.data.id) {
      this.getDetailUser(this.data.id)
    }
  }

  getDetailUser(id:string) {
    this.userService.getDetailUser(id).subscribe(data => {
      this.user=data
      this.profileForm.patchValue({
        name:data.name,
        email:data.email
      })
    })
  }

  saveProfile() {
    if(this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
