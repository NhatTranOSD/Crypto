import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenOrderHistoryComponent } from './token-order-history.component';

describe('TokenOrderHistoryComponent', () => {
  let component: TokenOrderHistoryComponent;
  let fixture: ComponentFixture<TokenOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
