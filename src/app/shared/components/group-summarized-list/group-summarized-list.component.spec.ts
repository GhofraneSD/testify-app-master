import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSummarizedListComponent } from './group-summarized-list.component';

describe('GroupSummarizedListComponent', () => {
  let component: GroupSummarizedListComponent;
  let fixture: ComponentFixture<GroupSummarizedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSummarizedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSummarizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
