import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../services/security/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-charts',
  templateUrl: 'charts.page.html',
  styleUrls: ['charts.page.scss'],
})
export class ChartsPageComponent {
  chartList :any;
  jsonChartList :any;
  constructor(
    private auth: AuthService,
    private translocoService: TranslocoService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.chartList = ['chart','2'];
    this.http.get('assets/files/charts.json').subscribe((res) => {
      this.jsonChartList = res;
    });
  }

  openPage(chartId: number) {
    this.router.navigate(['chart/',chartId]);
  }

}
