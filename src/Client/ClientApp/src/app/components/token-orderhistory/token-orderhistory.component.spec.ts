import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenOrderhistoryComponent } from './token-orderhistory.component';

describe('TokenOrderhistoryComponent', () => {
  let component: TokenOrderhistoryComponent;
  let fixture: ComponentFixture<TokenOrderhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenOrderhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenOrderhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
