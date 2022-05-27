import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/models/skill';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  public skills: Skill[] = [];
  public deleteSkills: Skill | undefined;
  public editSkills: Skill | undefined;

  constructor(private skillService: SkillService, public authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.getSkills();
  }

  public getSkills(): void {
    this.skillService.getSkill().subscribe({
      next: (Response: Skill[]) => {
        this.skills = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string, skill?: Skill): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillsModal');
    } else if (mode === 'delete') {
      this.deleteSkills = skill;
      button.setAttribute('data-target', '#deleteSkillsModal');
    } else if (mode === 'edit') {
      this.editSkills = skill;
      button.setAttribute('data-target', '#editSkillsModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddSkills(addForm: NgForm): void {
    document.getElementById('add-skills-form')?.click();
    this.skillService.addSkill(addForm.value).subscribe({
      next: (response: Skill) => {
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateSkills(skill: Skill) {
    this.editSkills = skill;
    this.skillService.updateSkill(skill).subscribe({
      next: (response: Skill) => {
        console.log(response);
        this.getSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteSkills(idSkill: number): void {

    this.skillService.deleteSkill(idSkill).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  logeado = () => this.authentication.logeado();
}
