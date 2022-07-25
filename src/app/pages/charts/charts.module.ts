import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { ComponentsModule } from 'src/app/components/components.module';
import { ChartsPageComponent } from './charts.page';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ChartsPageComponent,
  },
];
@NgModule({
  declarations: [ChartsPageComponent],
  imports: [
    CommonModule,
    IonicModule,    
    ComponentsModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
})
export class ChartsPageModule {}
