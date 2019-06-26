import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenOrderChartComponent } from './token-order-chart.component';

describe('TokenOrderChartComponent', () => {
  let component: TokenOrderChartComponent;
  let fixture: ComponentFixture<TokenOrderChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenOrderChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenOrderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
