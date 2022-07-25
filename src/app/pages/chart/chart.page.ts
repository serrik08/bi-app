import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../services/security/auth.service';

@Component({
  selector: 'app-page-chart',
  templateUrl: 'chart.page.html',
  styleUrls: ['chart.page.scss'],
})
export class ChartPageComponent {
  constructor(
    private auth: AuthService,
    private translocoService: TranslocoService,
  ) {}

}
