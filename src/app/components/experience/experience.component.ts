import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experience } from 'src/app/models/experience';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  public experiences: Experience[] = [];
  public deleteExperience: Experience | undefined;
  public editExperience: Experience | undefined;

  constructor(private experienceService: ExperienceService, public authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.getExperiences();
  }

  public getExperiences(): void {
    this.experienceService.getExperience().subscribe({
      next: (Response: Experience[]) => {
        this.experiences = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal(mode: string, experience?: Experience): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienceModal');
    } else if (mode === 'delete') {
      this.deleteExperience = experience;
      button.setAttribute('data-target', '#deleteExperienceModal');
    } else if (mode === 'edit') {
      this.editExperience = experience;
      button.setAttribute('data-target', '#editExperienceModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddExperience(addForm: NgForm): void {
    document.getElementById('add-experience-form')?.click();
    this.experienceService.addExperience(addForm.value).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperiences();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateExperience(experience: Experience) {
    this.editExperience = experience;
    this.experienceService.updateExperience(experience).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperiences();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteExperience(idExperience: number): void {

    this.experienceService.deleteExperience(idExperience).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperiences();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  logeado = () => this.authentication.logeado();
}
