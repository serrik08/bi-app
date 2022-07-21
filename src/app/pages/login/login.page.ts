import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/security/auth.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPageComponent {
  user: { username: string; password: string };
  alermessages: any = {};
  constructor(
    private router: Router,
    public alertCtrl: AlertController,
    public auth: AuthService,
    public translocoService: TranslocoService,
    public loginp: LoginService,
  ) {
    this.user = { username: 'admin', password: 'odoo123' };
  }

  isAuthenticated() {
    return this.auth.getAuthenticated();
  }

  loginForm() {
    this.loginp
      .login({ username: this.user.username, password: this.user.password })
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!res.body.token) {
            this.auth.setAuthenticated(false);
            this.presentAlert();
            return;
          }
          // CSRF 
          if (environment.security === 'csrf') {
            this.auth.setToken(res.body.token);
            this.auth.setAuthenticated(true);
            this.auth.setUsername(this.user.username);
            this.router.navigate(['home']);            
          }
          // JWT
          if (environment.security === 'jwt') {
            this.auth.setToken(res.body.token);
            this.auth.setAuthenticated(true);
            this.auth.setUsername(this.user.username);
            this.router.navigate(['home']);
          }
          console.log(this.auth);
        },
        (err: any) => {
          this.auth.setAuthenticated(false);   
          this.presentAlert();       
        },
      );
  }

  async presentAlert() {
    const alertTranslations: any = {};

    alertTranslations.header = this.translocoService.translate('alert.title');
    alertTranslations.subHeader = this.translocoService.translate(
      'alert.subtitle',
    );
    alertTranslations.dismiss = this.translocoService.translate(
      'alert.dismiss',
    );

    const alert = await this.alertCtrl.create({
      header: alertTranslations.header,
      subHeader: alertTranslations.subHeader,
      buttons: [alertTranslations.dismiss],
    });

    await alert.present();
  }
}
