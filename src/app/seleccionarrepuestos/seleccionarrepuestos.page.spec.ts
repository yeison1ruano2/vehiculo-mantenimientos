import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarrepuestosPage } from './seleccionarrepuestos.page';

describe('SeleccionarrepuestosPage', () => {
  let component: SeleccionarrepuestosPage;
  let fixture: ComponentFixture<SeleccionarrepuestosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeleccionarrepuestosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
