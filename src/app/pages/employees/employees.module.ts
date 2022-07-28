import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { ComponentsModule } from 'src/app/components/components.module';
import { EmployeesPageComponent } from './employees.page';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EmployeesPageComponent,
  },
];
@NgModule({
  declarations: [EmployeesPageComponent],
  imports: [
    CommonModule,
    IonicModule,    
    ComponentsModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
})
export class EmployeesPageModule {}
