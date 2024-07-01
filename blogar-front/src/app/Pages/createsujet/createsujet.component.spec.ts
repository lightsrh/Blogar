import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesujetComponent } from './createsujet.component';

describe('CreatesujetComponent', () => {
  let component: CreatesujetComponent;
  let fixture: ComponentFixture<CreatesujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatesujetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatesujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
