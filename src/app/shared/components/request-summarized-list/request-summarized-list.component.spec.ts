import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSummarizedListComponent } from './request-summarized-list.component';

describe('RequestSummarizedListComponent', () => {
  let component: RequestSummarizedListComponent;
  let fixture: ComponentFixture<RequestSummarizedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSummarizedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSummarizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
