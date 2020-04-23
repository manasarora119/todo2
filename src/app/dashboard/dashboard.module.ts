import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DLVMaterialModule } from 'dlv-material';
import { DashboardRoutesModule } from './dashboard.routes';
import { DashboardComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DLVMaterialModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers : [
  ]
})
export class DashboardModule { }
