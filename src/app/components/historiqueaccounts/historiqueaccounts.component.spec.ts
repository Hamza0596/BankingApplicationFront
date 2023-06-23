import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueaccountsComponent } from './historiqueaccounts.component';

describe('HistoriqueaccountsComponent', () => {
  let component: HistoriqueaccountsComponent;
  let fixture: ComponentFixture<HistoriqueaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueaccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
