import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { ListeCompetitionComponent } from './liste-competition.component';

describe('ListeCompetitionComponent', () => {
  let component: ListeCompetitionComponent;
  let fixture: ComponentFixture<ListeCompetitionComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCompetitionComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ championshipId: '456' }))
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCompetitionComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait créer le composant', () => {
    const req = httpMock.expectOne('/api/competition/championship/456');
    req.flush([]);
    expect(component).toBeTruthy();
  });

  it('devrait charger et afficher les compétitions', () => {
    const req = httpMock.expectOne('/api/competition/championship/456');
    expect(req.request.method).toBe('GET');

    const dummyCompetitions = [
      { id: 10, name: 'Saison 2023', events_count: 3, expanded: false },
      { id: 11, name: 'Saison 2024', events_count: 0, expanded: false }
    ];
    req.flush(dummyCompetitions);

    fixture.detectChanges();

    expect(component.competitions.length).toBe(2);
    const listItems = fixture.debugElement.queryAll(By.css('.list-item'));
    expect(listItems.length).toBe(2);

    const firstName = listItems[0].query(By.css('.item-name')).nativeElement.textContent;
    expect(firstName).toContain('Saison 2023');
  });
});
