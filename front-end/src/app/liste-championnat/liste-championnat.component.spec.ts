import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { ListeChampionnatComponent } from './liste-championnat.component';

describe('ListeChampionnatComponent', () => {
  let component: ListeChampionnatComponent;
  let fixture: ComponentFixture<ListeChampionnatComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeChampionnatComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            // Simulation des paramètres d'URL (sportId = 123)
            paramMap: of(convertToParamMap({ sportId: '123' }))
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeChampionnatComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges(); // Déclenche ngOnInit
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes HTTP en attente
  });

  it('should create', () => {
    // On s'attend à une requête HTTP car ngOnInit appelle loadChampionships
    const req = httpMock.expectOne('/api/championship/sport/123');
    req.flush([]); // Répond avec un tableau vide pour ce test basique
    expect(component).toBeTruthy();
  });

  it('devrait afficher la liste des championnats récupérés depuis l\'API', () => {
    // 1. Intercepter la requête HTTP générée à l'initialisation
    const req = httpMock.expectOne('/api/championship/sport/123');
    expect(req.request.method).toBe('GET');

    // 2. Simuler une réponse de l'API (Données de test)
    const dummyChampionships = [
      { id: 1, name: 'Ligue 1', competitions_count: 5 },
      { id: 2, name: 'Top 14', competitions_count: 2 }
    ];
    req.flush(dummyChampionships);

    // 3. Mettre à jour la vue
    fixture.detectChanges();

    // 4. Vérifier que le composant a bien mis à jour ses données
    expect(component.championships.length).toBe(2);
    expect(component.championships).toEqual(dummyChampionships);

    // 5. Vérifier le rendu HTML (Comportement)
    const listItems = fixture.debugElement.queryAll(By.css('.list-item'));
    expect(listItems.length).toBe(2);
    
    // Vérifier le texte du premier élément
    const firstItemName = listItems[0].query(By.css('.item-name')).nativeElement.textContent;
    expect(firstItemName).toContain('Ligue 1');
  });
});
