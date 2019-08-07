describe('Client', () => {
  beforeEach(() => {
    cy.fixture('clients').then((clients) => {
      localStorage.setItem('clients', JSON.stringify(clients));
    });
  });

  it('should register client', () => {
    const client = {
      name: 'Client 03',
      cpf: '73386736084',
      phone: '123456789',
      birthday: '06062001',
      address: 'Avenida das palmeiras',
      vehicle: {
        manufecturer: 'honda',
        model: 'vt 600'
      }
    };

    cy.visitNewClientPage()
    cy.fillClientForm(client);
    cy.submitClientForm();

    cy.isInClientPage();
    cy.checkConfirmationMsg('Cliente cadastrado com sucesso');
  });

  it('should edit client', () => {
    const client = {
      name: 'Client Updated',
      address: 'Avenida circular'
    };

    cy.visitClientPage();
    cy.get(':nth-child(1) > .cdk-column-actions > [mattooltip="Editar"]').click();
    cy.get('.mat-toolbar').should('contain', 'Editar Cliente');
    cy.fillClientForm(client);
    cy.submitClientForm();

    cy.isInClientPage();
    cy.checkConfirmationMsg('Cliente atualizado com sucesso')
  });

  it('should remove client', () => {
    cy.visitClientPage();
    cy.get(':nth-child(2) > .cdk-column-actions > [mattooltip="Remover"]').click();
    cy.get('[cdkfocusinitial=""]').click();

    cy.checkConfirmationMsg('Cliente removido com sucesso');
  });
});
