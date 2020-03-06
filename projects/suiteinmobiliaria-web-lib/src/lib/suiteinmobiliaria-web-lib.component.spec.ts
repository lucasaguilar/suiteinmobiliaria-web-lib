import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiteinmobiliariaWebLibComponent } from './suiteinmobiliaria-web-lib.component';

describe('SuiteinmobiliariaWebLibComponent', () => {
  let component: SuiteinmobiliariaWebLibComponent;
  let fixture: ComponentFixture<SuiteinmobiliariaWebLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiteinmobiliariaWebLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteinmobiliariaWebLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
