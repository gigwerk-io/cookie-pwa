export interface AnnouncementOptions {
  message: string,
  color: string,
  link?: string,
  enterAnimation?: 'top-slideup' | 'top-slidedown' | '',
  leaveAnimation?: 'top-slideup' | 'top-slidedown' | '',
  duration?: number
}
