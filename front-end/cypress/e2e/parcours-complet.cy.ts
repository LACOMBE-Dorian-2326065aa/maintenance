describe('Parcours Utilisateur Complet', () => {
  
  const mockSports = [
    { id: 1, name: 'Football', type: 'COLLECTIVE' },
    { id: 2, name: 'Tennis', type: 'INDIVIDUAL' }
  ];

  const mockChampionships = [
    { id: 10, name: 'Ligue 1', competitions_count: 2 },
    { id: 20, name: 'Coupe de France', competitions_count: 1 }
  ];

  const mockCompetitions = [
    { id: 100, name: 'Saison 2023-2024', events_count: 5, expanded: false },
    { id: 101, name: 'Saison 2022-2023', events_count: 0, expanded: false }
  ];

  const mockEvents = [
    { id: 1000, name: 'Finale' },
    { id: 1001, name: 'Demi-finale' }
  ];

  beforeEach(() => {
    cy.intercept('GET', '/api/sport', mockSports).as('getSports');
    cy.intercept('GET', '/api/championship/sport/*', mockChampionships).as('getChampionships');
    cy.intercept('GET', '/api/competition/championship/*', mockCompetitions).as('getCompetitions');
    cy.intercept('GET', '/api/event/competition/*', mockEvents).as('getEvents');
  });

  it('devrait permettre de naviguer du sport jusqu\'aux épreuves', () => {
    cy.visit('/');
    
    cy.url().should('include', '/sports');
    cy.contains('h2', 'Liste des Sports');

    cy.contains('.sport-card', 'Football').should('be.visible');
    cy.contains('.sport-card', 'Tennis').should('be.visible');

    cy.contains('.sport-card', 'Football').click();
    
    cy.wait('@getChampionships');

    cy.url().should('include', '/championnats');
    cy.contains('h2', 'Championnats');
    cy.contains('.item-name', 'Ligue 1').should('be.visible');

    cy.contains('.list-item', 'Ligue 1').click();

    cy.wait('@getCompetitions');

    cy.url().should('include', '/competitions');
    cy.contains('h2', 'Compétitions');
    cy.contains('.item-name', 'Saison 2023-2024').should('be.visible');

    cy.contains('.list-item', 'Saison 2023-2024').click();

    cy.wait('@getEvents');

    cy.contains('Finale').should('be.visible');
    cy.contains('Demi-finale').should('be.visible');
  });

  it('devrait afficher un message si aucune donnée (Cas vide)', () => {
    cy.intercept('GET', '/api/sport', []);
    
    cy.visit('/');
    cy.contains('h2', 'Liste des Sports');
    cy.get('.sport-card').should('not.exist');
  });

});
