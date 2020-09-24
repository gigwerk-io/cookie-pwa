import { Injectable } from '@angular/core';
import {Events} from '../../events';
import {ModalOptions} from '../../../../interfaces/enum/ModalOptions';
import {ModalItem} from '../../../../../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private events: Events
  ) { }

  public show(options: ModalOptions) {
    this.events.publish('global-modal', new ModalItem(options.component, options));
  }

  public dismiss(options?: ModalOptions) {
    this.events.publish('global-modal-dismiss', new ModalItem(options.component, options));
  }
}
