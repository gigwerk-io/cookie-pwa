export interface AlertOptions {
  alertMessage: string,
  color: string,
  position: 'top-0' | 'middle' | 'bottom-0',
  enterAnimation?: 'top-slideup' | 'top-slidedown' | 'bottom-slideup' | 'bottom-slidedown' | '',
  leaveAnimation?: 'top-slideup' | 'top-slidedown' | 'bottom-slideup' | 'bottom-slidedown' | '',
  duration?: number,
  actionButton?: {
    title: string,
    callback: (..._: any) => any,
  }
}
