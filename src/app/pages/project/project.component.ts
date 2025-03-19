import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/project.service';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
      this.projectService.getProject().subscribe(data => console.log(data)) 
  }
}
