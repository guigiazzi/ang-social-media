import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPeopleComponent } from './modal-people.component';

describe('ModalDialogComponent', () => {
  let component: ModalPeopleComponent;
  let fixture: ComponentFixture<ModalPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
