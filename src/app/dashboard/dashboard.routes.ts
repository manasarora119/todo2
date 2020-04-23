import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuardService } from '@app/core/services';

import { DashboardComponent } from './components';


const dashboardRoutesModule: Routes = [

    {
        path: ':id',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutesModule)
    ],
    exports: [
        RouterModule
    ]
})

export class DashboardRoutesModule {
}
