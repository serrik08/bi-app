import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { EmployeeService } from '../../services/employee/employee.service';
import { AuthService } from '../../services/security/auth.service';



@Component({
  selector: 'app-tasks',
  templateUrl: 'employees.page.html',
  styleUrls: ['employees.page.scss'],
})
export class EmployeesPageComponent implements OnInit {
  employees: any;
  employee: any;
  isModalOpen: boolean = false;
  colorStage :any = {
    1 : 'danger',
    2 : 'warning',
    3 : 'success',
    4 : 'dark'
  };
  constructor(
    private auth: AuthService,
    private alertCtrl: AlertController,
    private employeeService: EmployeeService,
    private translocoService: TranslocoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .subscribe(
        (res: any) => {
          this.employees = res;
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

  setOpen(isOpen: boolean, employee: any) {
    console.log(employee);
    this.employee = employee;
    this.isModalOpen = isOpen;    
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
