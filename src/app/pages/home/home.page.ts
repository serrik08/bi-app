import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,ToastController } from '@ionic/angular';
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
  qtyProjects: number;
  qtyTasks: number;
  qtyEmployees: number;
  apiKey: string;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private auth: AuthService,
    private projectService: ProjectService,
    private translocoService: TranslocoService,
    private toastController: ToastController,
  ) {
    this.user = { username: auth.getUsername() };
    this.apiKey = localStorage.getItem('apiKey');
  }

  updateForm(): void {
    this.updateData();
  }

  updateData(): void {
    console.log(this.apiKey);
    this.projectService
      .updateData({
        username: this.auth.getUsername(),
        tokenOdoo: this.apiKey
      })
      .subscribe(
        (res: any) => {
          if (!res.projects || !res.tasks || !res.users) {
            this.presentAlertError();
            return;
          }
          console.log(res);
          this.qtyProjects = res.projects;
          this.qtyTasks = res.tasks;
          this.qtyEmployees = res.users;
          this.presentToastSuccess();
        },
        (err: any) => {
          console.log(err);
          console.log(err.status);
          if (err.status = 401) {
            this.presentAlertUnauthorized();
            this.logout();
          }
          else {
            this.presentAlertError();
          }
        });
  }

  navigateProjectsPage(): void {
    this.router.navigate(['projects']);
  }

  navigateEmployeesPage(): void {
    this.router.navigate(['employees']);
  }

  navigateChartsPage(): void {
    this.router.navigate(['charts']);
  }

  navigateKpisPage(): void {
    this.router.navigate(['kpis']);
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

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: this.translocoService.translate('toast.update-data'),
      duration: 500,
      color: "green",
      icon: 'checkmark-circle',
      position: 'bottom'
    });
    toast.present();
  }

  logout(): void {
    this.auth.setAuthenticated(false);
    this.auth.setToken('');
    this.router.navigate(['']);
  }
}
