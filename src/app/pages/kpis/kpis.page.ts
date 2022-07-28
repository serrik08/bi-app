import { Component, OnInit } from '@angular/core';
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
    private kpiService: KpiService,
    private translocoService: TranslocoService,
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

}
