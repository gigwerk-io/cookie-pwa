import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {Events} from '../../utils/services/internal/events';
import {ModalContentComponent, ModalOptions} from '../../utils/interfaces/enum/ModalOptions';
import {ModalHostDirective} from '../../utils/directives/components/modal/modal-host.directive';

@Component({
  selector: 'gig-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {

  @Input('showModal') show: boolean;
  @Input('position') pos: 'top' | 'middle' | 'bottom';
  @Input('modalComponent') modalComponent: ModalContentComponent;

  @ViewChild(ModalHostDirective) modalHost: ModalHostDirective;
  animateIn: boolean = true;

  constructor(
    public events: Events,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngAfterViewInit() {
    this.events.subscribe('global-modal', (modalItem: ModalItem) => {
      const modalOptions = modalItem.modalOptions;
      this.show = true;
      this.pos = modalOptions.position;
      this.modalComponent = modalOptions.component;
      this.loadComponent(modalItem);
    });
    this.events.subscribe('global-modal-dismiss', (modalOptions: ModalOptions) => {
      this.show = false;
    })
  }

  ngOnDestroy() {
    this.events.unsubscribe('global-modal');
    this.events.unsubscribe('global-modal-dismiss');
  }

  loadComponent(modalItem: ModalItem) {
    const componentFactory: ComponentFactory<ModalContentComponent> = this.componentFactoryResolver.resolveComponentFactory<ModalContentComponent>(modalItem.component);
    const viewContainerRef: ViewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ModalContentComponent>(componentFactory);
    componentRef.instance.modalOptions = modalItem.modalOptions;
  }

  public dismiss() {
    this.animateIn = false;
    setTimeout(() => {
      this.show = false;
      this.animateIn = true;
    }, 500);
  }
}

export class ModalItem {
  constructor(
    public component: Type<any>,
    public modalOptions: ModalOptions
  ) {
  }
}
