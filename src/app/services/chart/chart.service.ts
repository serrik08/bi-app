import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { BusinessOperatorService } from '../shared/business-operator.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private serviceId: number = environment.serviceIdERP;
  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private bo: BusinessOperatorService,
  ) { }

  projectsPerDate(): Observable<any> {
    const headers= new HttpHeaders({name: 'Authorization', value: this.auth.getToken()});
    return this.http.post(
      this.bo.projectsPerDate(),
      {serviceId: this.serviceId}
      , {headers: headers}
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
