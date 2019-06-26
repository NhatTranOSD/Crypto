import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderChartComponent } from './product-order-chart.component';

describe('ProductOrderChartComponent', () => {
  let component: ProductOrderChartComponent;
  let fixture: ComponentFixture<ProductOrderChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrderChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
