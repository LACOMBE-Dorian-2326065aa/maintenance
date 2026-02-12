import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { SportComponent } from './sport.component';

describe('SportComponent', () => {
  let component: SportComponent;
  let fixture: ComponentFixture<SportComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]) // Pas besoin de routes spécifiques pour ce test de base
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges(); // Déclenche ngOnInit
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait créer le composant', () => {
    const req = httpMock.expectOne('/api/sport'); // Appelé au ngOnInit
    req.flush([]);
    expect(component).toBeTruthy();
  });

  it('devrait charger et afficher la liste des sports', () => {
    // 1. Intercepter l'appel initial
    const req = httpMock.expectOne('/api/sport');
    expect(req.request.method).toBe('GET');

    // 2. Simuler la réponse
    const dummySports = [
      { id: 1, name: 'Football', type: 'COLLECTIVE' },
      { id: 2, name: 'Tennis', type: 'INDIVIDUAL' }
    ];
    req.flush(dummySports);

    // 3. Mettre à jour la vue
    fixture.detectChanges();

    // 4. Vérifier les données du composant
    expect(component.sports.length).toBe(2);
    expect(component.sports).toEqual(dummySports);

    // 5. Vérifier le rendu HTML
    const sportCards = fixture.debugElement.queryAll(By.css('.sport-card'));
    expect(sportCards.length).toBe(2);
    
    const firstCardTitle = sportCards[0].query(By.css('h3')).nativeElement.textContent;
    expect(firstCardTitle).toContain('Football');
  });
});
