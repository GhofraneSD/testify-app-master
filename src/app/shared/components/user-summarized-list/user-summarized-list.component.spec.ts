import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSummarizedListComponent } from './user-summarized-list.component';

describe('UserSummarizedListComponent', () => {
  let component: UserSummarizedListComponent;
  let fixture: ComponentFixture<UserSummarizedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSummarizedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSummarizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
