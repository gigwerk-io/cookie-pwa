import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {AlertComponent} from './alert/alert.component';
import {CommonModule} from '@angular/common';
import {JobCardComponent} from './job-card/job-card.component';
import {IonicModule} from '@ionic/angular';
import {ModalComponent} from './modal/modal.component';
import {ModalHostDirective} from '../utils/directives/components/modal/modal-host.directive';

const COMPONENTS = [
  AlertComponent,
  HeaderComponent,
  JobCardComponent,
  ToolbarComponent,
  ModalComponent,
  ModalHostDirective
];
const MODULES = [];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, CommonModule, IonicModule],
  exports: [...COMPONENTS, ...MODULES]
})
export class ComponentsModule {
}
