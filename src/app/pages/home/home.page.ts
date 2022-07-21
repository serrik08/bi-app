import { TranslocoService } from '@ngneat/transloco';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/security/auth.service';
import { Component } from '@angular/core';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {
  user: { username: string };
  constructor(
    public auth: AuthService, 
    public translate: TranslocoService,
    private projectService: ProjectService
  ) {
    this.user = { username: auth.getUsername() };
  }

  updateForm() {
    this.updateData();
  }

  updateData() {
    this.projectService
      .updateData({ 
        username: this.auth.getUsername(), 
        tokenBi: this.auth.getToken(), 
        tokenOdoo: '3cc1f007-447c-4721-9cd9-6a0aa6eddc40' })
      .subscribe(
        (res: any) =>{
          console.log(res);
        },
        (err: any) =>{
          console.log(err);
        });
  }
}
