import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFavoritePage } from './card-favorite.page';

describe('CardFavoritePage', () => {
  let component: CardFavoritePage;
  let fixture: ComponentFixture<CardFavoritePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFavoritePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFavoritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
