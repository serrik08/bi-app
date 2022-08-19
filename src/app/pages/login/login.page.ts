import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
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
    private alertCtrl: AlertController,
    private auth: AuthService,
    private translocoService: TranslocoService,
    private loginp: LoginService,
    private toastController: ToastController,
  ) {
    this.user = { username: 'gerente@ahorasoft.com', password: 'odoo12' };
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
            if (res.body.errCode === 'ERR1002') {
              this.auth.setAuthenticated(false);
              this.presentAlertWrongCredentials();
            }
            if (res.body.errCode === 'ERR1004') {
              this.auth.setAuthenticated(false);
              this.presentAlertManyLoginFailures();
            }
            this.presentToastLoginFail();
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
          this.presentToastLogin();
          console.log(this.auth);
        },
        (err: any) => {
          console.log(err)
          this.auth.setAuthenticated(false);
          this.presentAlertError(err.name);
        },
      );
  }

  async presentAlertError(errMsg: string) {
    const alertTranslations: any = {};
    alertTranslations.header = this.translocoService.translate('alert-error.title');
    alertTranslations.dismiss = this.translocoService.translate('alert-error.dismiss');
    const alert = await this.alertCtrl.create({
      header: alertTranslations.header,
      subHeader: errMsg,
      buttons: [alertTranslations.dismiss],
    });
    await alert.present();
  }
  async presentAlertWrongCredentials() {
    const alertTranslations: any = {};
    alertTranslations.header = this.translocoService.translate('alert-login.title');
    alertTranslations.subHeader = this.translocoService.translate('alert-login.subtitle');
    alertTranslations.dismiss = this.translocoService.translate('alert-login.dismiss');
    const alert = await this.alertCtrl.create({
      header: alertTranslations.header,
      subHeader: alertTranslations.subHeader,
      buttons: [alertTranslations.dismiss],
    });
    await alert.present();
  }
  async presentAlertManyLoginFailures() {
    const alertTranslations: any = {};
    alertTranslations.header = this.translocoService.translate('alert-login-attempts.title');
    alertTranslations.subHeader = this.translocoService.translate('alert-login-attempts.subtitle');
    alertTranslations.dismiss = this.translocoService.translate('alert-login-attempts.dismiss');
    const alert = await this.alertCtrl.create({
      header: alertTranslations.header,
      subHeader: alertTranslations.subHeader,
      buttons: [alertTranslations.dismiss],
    });
    await alert.present();
  }

  async presentToastLogin() {
    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: this.translocoService.translate('alert-login.success'),
      duration: 3000,
      color: "green",
      icon: 'checkmark-circle',
      position: 'bottom'
    });
    toast.present();
  }

  async presentToastLoginFail() {
    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: "Intento 1",
      duration: 3000,
      color: "danger",
      icon: 'checkmark-circle',
      position: 'bottom'
    });
    toast.present();
  }

}
