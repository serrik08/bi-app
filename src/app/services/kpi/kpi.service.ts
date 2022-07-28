import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { BusinessOperatorService } from '../shared/business-operator.service';

import { environment } from '../../../environments/environment';
import { options } from 'sw-toolbox';

/*
 * Generated class for the ProjectService service.
 * See https://angular.io/guide/dependency-injection for more info on services
 * and Angular DI.
 */
@Injectable({ providedIn: 'root' })
export class KpiService {
  private serviceId: number = environment.serviceIdERP;
  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private bo: BusinessOperatorService,
  ) { }

  getKpiErp(): Observable<any> {
    const headers= new HttpHeaders({name: 'Authorization', value: this.auth.getToken()});
    return this.http.post(
      this.bo.getKpiErp(),
      {serviceId: this.serviceId}
      , {headers: headers}
    );
  }
}
