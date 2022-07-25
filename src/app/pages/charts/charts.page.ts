import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../services/security/auth.service';


@Component({
  selector: 'app-page-charts',
  templateUrl: 'charts.page.html',
  styleUrls: ['charts.page.scss'],
})
export class ChartsPageComponent {
  chartList :any;
  constructor(
    private auth: AuthService,
    private translocoService: TranslocoService,
    private router: Router,
  ) {
    this.chartList = ['chart','2']
  }

  openPage(p: any) {
    console.log(p)
    this.router.navigate([p]);
  }

}
