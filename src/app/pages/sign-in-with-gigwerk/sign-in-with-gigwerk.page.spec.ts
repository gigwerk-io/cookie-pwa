import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignInWithGigwerkPage } from './sign-in-with-gigwerk.page';

describe('SignInWithGigwerkPage', () => {
  let component: SignInWithGigwerkPage;
  let fixture: ComponentFixture<SignInWithGigwerkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInWithGigwerkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInWithGigwerkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
