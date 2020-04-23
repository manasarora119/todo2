import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CoreRoutesModule } from "./core.routes";
import { DlvNgAuthModule } from "dlv-ng-auth";
import { DlvMaterialServicesMenuModule } from "dlv-ng-services-menu";
import { MatRadioModule } from '@angular/material/radio';
import {
  LayoutComponent,
  SidebarComponent,

} from "./components";

import {
  
  LoaderService,
  BroadcasterService,
  BroadcastService,

} from "./services/";
import { SharedModule } from "../shared/shared.module";
// import { BroadcastService } from "../shared/services";
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
   
  ],
  imports: [
    CommonModule,
    DlvNgAuthModule,
    MatInputModule,
    MatRadioModule,
    SharedModule,
    DlvMaterialServicesMenuModule,
    FormsModule,
    CoreRoutesModule
  ],
  providers: [BroadcastService],
  entryComponents: []
})
export class CoreModule { }
