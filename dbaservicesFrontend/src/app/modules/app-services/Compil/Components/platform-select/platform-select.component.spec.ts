import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSelectComponent } from './platform-select.component';

describe('PlatformSelectComponent', () => {
  let component: PlatformSelectComponent;
  let fixture: ComponentFixture<PlatformSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
