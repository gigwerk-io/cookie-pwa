import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {AlertComponent} from './alert/alert.component';
import {CommonModule} from '@angular/common';

const COMPONENTS = [
  AlertComponent,
  HeaderComponent,
  ToolbarComponent
];
const MODULES = [];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, CommonModule],
  exports: [...COMPONENTS, ...MODULES]
})
export class ComponentsModule {
}
