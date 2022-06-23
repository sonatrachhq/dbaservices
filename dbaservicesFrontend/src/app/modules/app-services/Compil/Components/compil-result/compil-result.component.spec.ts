import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilResultComponent } from './compil-result.component';

describe('CompilResultComponent', () => {
  let component: CompilResultComponent;
  let fixture: ComponentFixture<CompilResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompilResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
