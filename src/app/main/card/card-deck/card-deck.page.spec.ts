import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeckPage } from './card-deck.page';

describe('CardDeckPage', () => {
  let component: CardDeckPage;
  let fixture: ComponentFixture<CardDeckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDeckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
