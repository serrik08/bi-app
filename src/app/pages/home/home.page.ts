import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/security/auth.service';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {
  user: { username: string };
  qtyProjects : number;
  qtyTasks : number;
  qtyEmployees: number;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private auth: AuthService,
    private projectService: ProjectService,
    private translocoService: TranslocoService,
  ) {
    this.user = { username: auth.getUsername() };
  }

  updateForm(): void{
    this.updateData();
  }

  updateData(): void{
    this.projectService
      .updateData({ 
        username: this.auth.getUsername(),
        tokenOdoo: '3cc1f007-447c-4721-9cd9-6a0aa6eddc40' })
      .subscribe(
        (res: any) =>{
          if (!res.projects || !res.tasks || !res.users) {
            this.presentAlert();
            return;
          }
          console.log(res);
          this.qtyProjects = res.projects;
          this.qtyTasks = res.tasks;
          this.qtyEmployees = res.users;
        },
        (err: any) =>{
          console.log(err);
          if (err.status = 403) {
            this.logout();
          }
          this.presentAlert();
        });
  }

  navigateProjectsPage(): void{
    this.router.navigate(['projects']); 
  }

  navigateEmployeesPage(): void{
    this.router.navigate(['employees']); 
  }

  navigateChartsPage(): void{
    this.router.navigate(['charts']); 
  }

  navigateKpisPage(): void{
    this.router.navigate(['kpis']); 
  }

  async presentAlert(): Promise<any> {
    const alertTranslations: any = {};

    alertTranslations.header = this.translocoService.translate('alert-home.title');
    alertTranslations.subHeader = this.translocoService.translate(
      'alert-home.subtitle',
    );
    alertTranslations.dismiss = this.translocoService.translate(
      'alert-home.dismiss',
    );

    const alert = await this.alertCtrl.create({
      header: alertTranslations.header,
      subHeader: alertTranslations.subHeader,
      buttons: [alertTranslations.dismiss],
    });

    await alert.present();
  }

  logout(): void {
    this.auth.setAuthenticated(false);
    this.auth.setToken('');
    this.router.navigate(['']);
  }
}
