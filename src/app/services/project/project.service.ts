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
export class ProjectService {
  private serviceId: number = environment.serviceIdERP;
  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private bo: BusinessOperatorService,
  ) { }

  updateData(projectParams: any): Observable<any> {
    const headers= new HttpHeaders({name: 'Authorization', value: this.auth.getToken()});
    return this.http.post(
      this.bo.updateData(),
      {
        serviceId: this.serviceId,
        userOdoo: projectParams.username,
        tokenOdoo: projectParams.tokenOdoo
      }, {headers: headers}
    );
  }

  getProjects(): Observable<any> {
    const headers= new HttpHeaders({name: 'Authorization', value: this.auth.getToken()});
    return this.http.post(
      this.bo.getProjects(),
      {serviceId: this.serviceId}
      , {headers: headers}
    );
  }
}
