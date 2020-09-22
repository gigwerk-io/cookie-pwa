import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInWithGigwerkPageRoutingModule } from './sign-in-with-gigwerk-routing.module';

import { SignInWithGigwerkPage } from './sign-in-with-gigwerk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInWithGigwerkPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SignInWithGigwerkPage]
})
export class SignInWithGigwerkPageModule {}
