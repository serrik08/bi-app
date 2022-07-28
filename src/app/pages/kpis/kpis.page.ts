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
    private kpiService: KpiService,
    private translocoService: TranslocoService,
  ) { }

  ngOnInit(): void {
    this.kpiService
      .getEmployees()
      .subscribe(
        (res: any) => {
          this.employees = res;
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }

      );
  }

}
