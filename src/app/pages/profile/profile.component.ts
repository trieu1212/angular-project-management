import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../core/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileFormComponent } from '../../components/edit-profile-form/edit-profile-form.component';
import { IUser } from '../../core/models/interface/user.interface';
@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userId:string = ''
  user:IUser = {
    id: '',
    name: "",
    email: '',
    projectIds:[]
  }

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    const user:any = localStorage.getItem('user')
    const jsonUser = JSON.parse(user)
    this.userId = jsonUser.uid 
    this.getUserData(this.userId)
  }

  getUserData(id:string) {
    this.userService.getDetailUser(id).subscribe(data => {
      this.user = data
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditProfileFormComponent,{
      width: '600px',
      height: '400px',
      data: {
        id: this.userId
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        const data:Pick<IUser, "name" | "email"> = {
          name: res.name,
          email: res.email
        }
        this.userService.editProfile(this.userId, data).subscribe(() => {
          alert("Edit profile successfully!")
          this.getUserData(this.userId)
        })
      }
    })
  }
}
