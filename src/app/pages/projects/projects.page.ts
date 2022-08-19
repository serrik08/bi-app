import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AlertController } from '@ionic/angular';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/security/auth.service';
import { Router } from '@angular/router';


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
    private alertCtrl: AlertController,
    private projectService: ProjectService,
    private translocoService: TranslocoService,
    private router: Router,
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
          if (err.status = 401) {
            this.presentAlertUnauthorized();
            this.logout();
          }
          else {
            this.presentAlertError();
          }
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

  logout(): void {
    this.auth.setAuthenticated(false);
    this.auth.setToken('');
    this.router.navigate(['']);
  }
  
  async presentAlertError(): Promise<any> {
    const alertTranslations: any = {};
    alertTranslations.header = this.translocoService.translate('alert-home.title');
    alertTranslations.subHeader = this.translocoService.translate('alert-home.subtitle');
    alertTranslations.dismiss = this.translocoService.translate('alert-home.dismiss');
    const alert = await this.alertCtrl.create({
      header: alertTranslations.header,
      subHeader: alertTranslations.subHeader,
      buttons: [alertTranslations.dismiss],
    });
    await alert.present();
  }

  async presentAlertUnauthorized(): Promise<any> {
    const alertTranslations: any = {};
    alertTranslations.header = this.translocoService.translate('alert-unauthorized.title');
    alertTranslations.subHeader = this.translocoService.translate('alert-unauthorized.subtitle');
    alertTranslations.dismiss = this.translocoService.translate('alert-unauthorized.dismiss');
    const alert = await this.alertCtrl.create({
      header: alertTranslations.header,
      subHeader: alertTranslations.subHeader,
      buttons: [alertTranslations.dismiss],
    });
    await alert.present();
  }
}
