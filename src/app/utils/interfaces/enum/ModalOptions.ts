import {ElementRef} from '@angular/core';

export interface ModalOptions {
  position: 'top' | 'middle' | 'bottom',
  component: any
}

export interface ModalContentComponent {
  modalOptions: ModalOptions;
}
