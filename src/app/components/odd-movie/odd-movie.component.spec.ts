import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OddMovieComponent } from './odd-movie.component';

describe('OddMovieComponent', () => {
  let component: OddMovieComponent;
  let fixture: ComponentFixture<OddMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OddMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
