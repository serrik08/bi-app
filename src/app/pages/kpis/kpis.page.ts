import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { KpiService } from '../../services/kpi/kpi.service';
import { AuthService } from '../../services/security/auth.service';

@Component({
  selector: 'app-kpis',
  templateUrl: 'kpis.page.html',
  styleUrls: ['kpis.page.scss'],
})
export class KpisPageComponent implements OnInit {
  percent=55;
  employees: any;
  employee: any;
  isModalOpen: boolean = false;
  listKpi: any[];
  colorStage :any = {
    1 : 'danger',
    2 : 'warning',
    3 : 'success',
    4 : 'dark'
  };
  currentQuarterPercent:any={
    percent:0,
    colorStage:2
  };
  constructor(
    private auth: AuthService,
    private alertCtrl: AlertController,
    private kpiService: KpiService,
    private translocoService: TranslocoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.kpiService
      .getKpiErp()
      .subscribe(
        (res: any) => {
          this.listKpi = res;
          this.getcurrentQuarterPercent();
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

  getcurrentQuarterPercent():void {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let days:number;
    console.log("day",day,month);
    if (month>=3 && month<6){
      month = month-3;
    }
    if (month>=6 && month<9){
      month = month-6;
    }
    if (month>9){
      month = month-9;
    }
    days = ((month) * 30) + day;
    this.currentQuarterPercent.percent = (((days * 100) /90)/100).toFixed(2);
    console.log('current percent',days,this.currentQuarterPercent);
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
