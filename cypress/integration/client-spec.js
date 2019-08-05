describe('Client', () => {
  beforeEach(() => {
    cy.fixture('clients').then((clients) => {
      localStorage.setItem('clients', JSON.stringify(clients));
    });
  });

  it('should register client', () => {
    cy.visit('/client/new');
    cy.get('#mat-input-0').type('Client 03');
    cy.get('#mat-input-1').type('73386736084');
    cy.get('#mat-input-2').type('123456789');
    cy.get('#mat-input-3').type('06062001');
    cy.get('#mat-input-4').type('Avenida das palmeiras');
    cy.get('.mat-select-arrow').click();
    cy.get('#mat-option-0 > .mat-option-text').click();
    cy.get('#mat-input-5').type('honda');
    cy.get('.mat-option-text').click();
    cy.get('#mat-input-6').type('vt 600');
    cy.get('.mat-option-text').click();
    cy.get('.mat-raised-button').click();

    cy.url().should('include', '/client');
    cy.get('.toast-success').should('contain', 'Cliente cadastrado com sucesso');
  });

  it('should edit client', () => {
    cy.visit('/client');
    cy.get(':nth-child(1) > .cdk-column-actions > [mattooltip="Editar"]').click();
    cy.get('.mat-toolbar').should('contain', 'Editar Cliente');
    cy.get('#mat-input-0').clear();
    cy.get('#mat-input-0').type('Client Updated');
    cy.get('#mat-input-4').clear();
    cy.get('#mat-input-4').type('Avenida circular');
    cy.get('.mat-raised-button').click();

    cy.url().should('include', '/client');
    cy.get('.toast-success').should('contain', 'Cliente atualizado com sucesso');
  });

  it('should remove client', () => {
    cy.visit('/client');
    cy.get(':nth-child(2) > .cdk-column-actions > [mattooltip="Remover"]').click();
    cy.get('[cdkfocusinitial=""]').click();

    cy.get('.toast-success').should('contain', 'Cliente removido com sucesso');
  });
});
