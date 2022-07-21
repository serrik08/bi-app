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
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    private bo: BusinessOperatorService,
  ) { }

  updateData(projectParams: any): Observable<any> {
    const headers1= new HttpHeaders({name: 'Authorization', value: projectParams.tokenBi});
    return this.http.post(
      this.bo.updateData(), // url
      // body
      {
        serviceId: '1',
        userOdoo: projectParams.username,
        tokenOdoo: projectParams.tokenOdoo
      }, {headers: headers1}
    );
  }
}
