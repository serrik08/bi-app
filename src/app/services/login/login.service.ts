import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { BusinessOperatorService } from '../shared/business-operator.service';

import { environment } from '../../../environments/environment';

/*
 * Generated class for the LoginService service.
 * See https://angular.io/guide/dependency-injection for more info on services
 * and Angular DI.
 */
@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    private bo: BusinessOperatorService,
  ) { }

  login(loginParams: any): Observable<any> {
    let options: any;
    // CSRF
    if (environment.security === 'csrf') {
      options = {
        withCredentials: false,
        responseType: 'json'
      };
    }
    // JWT
    if (environment.security === 'jwt') {
      options = { observe: 'response' };
    }
    return this.http.post(
      this.bo.login(), // url
      // body
      {
        data: {
          serviceId: '1',
          user: loginParams.username,
          password: loginParams.password
        }
      },
      options,
    );
  }
}
