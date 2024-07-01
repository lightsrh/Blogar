import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesujetComponent } from './updatesujet.component';

describe('UpdatesujetComponent', () => {
  let component: UpdatesujetComponent;
  let fixture: ComponentFixture<UpdatesujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatesujetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatesujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
