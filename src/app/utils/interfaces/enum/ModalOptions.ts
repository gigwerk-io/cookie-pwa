export interface ModalOptions {
  position: 'top' | 'middle' | 'bottom',
  component: any,
  data?: any
}

export interface ModalContentComponent {
  modalOptions: ModalOptions;
}
