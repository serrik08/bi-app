import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomePageComponent } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];
@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    TranslocoModule,
    RouterModule.forChild(routes),
  ],
})
export class HomePageModule {}
