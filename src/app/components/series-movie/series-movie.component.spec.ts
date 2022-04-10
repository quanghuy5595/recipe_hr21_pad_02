import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesMovieComponent } from './series-movie.component';

describe('SeriesMovieComponent', () => {
  let component: SeriesMovieComponent;
  let fixture: ComponentFixture<SeriesMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
