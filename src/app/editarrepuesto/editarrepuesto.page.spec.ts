import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarrepuestoPage } from './editarrepuesto.page';

describe('EditarrepuestoPage', () => {
  let component: EditarrepuestoPage;
  let fixture: ComponentFixture<EditarrepuestoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarrepuestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
