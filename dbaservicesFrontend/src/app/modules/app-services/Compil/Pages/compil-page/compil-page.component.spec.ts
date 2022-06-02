import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilPageComponent } from './compil-page.component';

describe('CompilPageComponent', () => {
  let component: CompilPageComponent;
  let fixture: ComponentFixture<CompilPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompilPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
