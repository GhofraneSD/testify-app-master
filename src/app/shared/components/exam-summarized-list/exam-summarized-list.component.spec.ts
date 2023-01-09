import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSummarizedListComponent } from './exam-summarized-list.component';

describe('ExamSummarizedListComponent', () => {
  let component: ExamSummarizedListComponent;
  let fixture: ComponentFixture<ExamSummarizedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamSummarizedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSummarizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
