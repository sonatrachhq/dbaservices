import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilConfirmComponent } from './compil-confirm.component';

describe('CompilConfirmComponent', () => {
  let component: CompilConfirmComponent;
  let fixture: ComponentFixture<CompilConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompilConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
