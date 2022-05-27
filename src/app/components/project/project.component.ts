import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public projects: Project[] = [];
  public deleteProject: Project | undefined;
  public editProject: Project | undefined;

  constructor(private projectService: ProjectService, public authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  public getProjects(): void {
    this.projectService.getProject().subscribe({
      next: (Response: Project[]) => {
        this.projects = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal(mode: string, project?: Project): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProjectModal');
    } else if (mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-target', '#deleteProjectModal');
    } else if (mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-target', '#editProjectModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddProject(addForm: NgForm): void {
    document.getElementById('add-project-form')?.click();
    this.projectService.addProject(addForm.value).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProjects();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateProject(project: Project) {
    this.editProject = project;
    this.projectService.updateProject(project).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProjects();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteProject(idProject: number): void {

    this.projectService.deleteProject(idProject).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProjects();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  logeado = () => this.authentication.logeado();
}
