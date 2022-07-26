import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';

/**
 * Generated class for the BussinessOperatorService service.
 * See https://angular.io/guide/dependency-injection for more info on providers
 * and Angular DI.
 */
@Injectable({ providedIn: 'root' })
export class BusinessOperatorService {
  public serverPath = SERVER_URL;
  public restPath = SERVER_URL + 'api/v1/';
  constructor() { }

  /**
   * @returns The url to the login service.
   */
  login() {
    return this.restPath + 'login';
  }

  /**
   * @returns The url to the logout service.
   */
  logout() {
    return this.restPath + 'logout';
  }

  /**
   * @returns The url to the updateProjects service.
   */
  updateData() {
    return this.restPath + 'updatedata';
  }

  /**
   * @returns The url to the updateProjects service.
   */
  getProjects() {
    return this.restPath + 'getprojects';
  }

  projectsPerDate() {
    return this.restPath + 'chartprojectsperdate';
  }

  chartpercentoftags() {
    return this.restPath + 'chartpercentoftags';
  }

  charttasksperemployee() {
    return this.restPath + 'charttasksperemployee';
  }

  chartcostPerDate() {
    return this.restPath + 'chartcostperdate';
  }

  getEmployees() {
    return this.restPath + 'getemployees';
  }
  
  getKpiErp() {
    return this.restPath + 'getkpierp';
  }
  
  /**
   * @returns The url to the sampledata management service.
   */
  sampledataService() {
    return this.restPath + 'sampledatamanagement/v1/sampledata/';
  }
}
