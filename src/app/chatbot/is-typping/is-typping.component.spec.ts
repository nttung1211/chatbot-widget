import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsTyppingComponent } from './is-typping.component';

describe('IsTyppingComponent', () => {
  let component: IsTyppingComponent;
  let fixture: ComponentFixture<IsTyppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsTyppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsTyppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
