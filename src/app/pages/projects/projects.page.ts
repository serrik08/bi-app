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
  ) { }

  ngOnInit(): void {
    console.log("Inicio projects");
    console.log(this.colorStage[1]);
    console.log(this.colorStage[2]);
    this.projectService
      .getProjects()
      .subscribe(
        (res: any) =>{
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

  // modalGetProject(projectId: number): void {
  //   console.log("modal ",projectId);
  // }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
