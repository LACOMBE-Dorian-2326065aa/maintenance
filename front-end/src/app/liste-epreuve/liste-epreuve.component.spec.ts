import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { ListeEpreuveComponent } from './liste-epreuve.component';

describe('ListeEpreuveComponent', () => {
  let component: ListeEpreuveComponent;
  let fixture: ComponentFixture<ListeEpreuveComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEpreuveComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ competitionId: '789' }))
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEpreuveComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait créer le composant', () => {
    const req = httpMock.expectOne('/api/event/competition/789');
    req.flush([]);
    expect(component).toBeTruthy();
  });

  it('devrait charger et afficher les épreuves', () => {
    const req = httpMock.expectOne('/api/event/competition/789');
    expect(req.request.method).toBe('GET');

    const dummyEvents = [
      { id: 101, name: '100m Sprint' },
      { id: 102, name: 'Saut en longueur' }
    ];
    req.flush(dummyEvents);

    fixture.detectChanges();

    expect(component.events.length).toBe(2);
    const listItems = fixture.debugElement.queryAll(By.css('.list-item'));
    expect(listItems.length).toBe(2);

    const firstName = listItems[0].query(By.css('.item-name')).nativeElement.textContent;
    expect(firstName).toContain('100m Sprint');
  });
});
