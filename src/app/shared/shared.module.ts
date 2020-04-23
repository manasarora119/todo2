import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './components/';

import { RouterModule, Routes } from '@angular/router';
// import { BroadcastService } from './services';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule
	],
	declarations: [
		LoaderComponent
	],
	providers:[],
	exports: [
		LoaderComponent
	]
})

export class SharedModule {

}
