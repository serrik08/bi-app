import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/security/auth.service';


@Component({
  selector: 'app-page-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss'],
})
export class ProjectPageComponent implements OnInit,OnChanges{
  projects : any;
  project: any;
  colorStage :any = {
    1 : 'danger',
    2 : 'warning',
    3 : 'success',
    4 : 'dark'
  };
  isModalOpen: boolean = false;
  constructor(
    private auth: AuthService,
    private projectService: ProjectService,
    private translocoService: TranslocoService,
  ) { 
    this.project = {name:""}
  }

  ngOnInit(): void {
    this.projectService
      .getProjects()
      .subscribe(
        (res: any) =>{
          res.forEach(element => {
            element.description = this.removeHtmlTagFromString(element.description);
          });
          this.projects = res;
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Chambio projects");
  }

  setOpen(isOpen: boolean, project: any) {
    console.log(project);
    this.project = project;
    this.isModalOpen = isOpen;
    
  }  

  removeHtmlTagFromString(paragraph: string) {
    var temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = paragraph;
    return temporalDivElement.textContent;
  }

}
