import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevorepuestoPage } from './nuevorepuesto.page';

describe('NuevorepuestoPage', () => {
  let component: NuevorepuestoPage;
  let fixture: ComponentFixture<NuevorepuestoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevorepuestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
