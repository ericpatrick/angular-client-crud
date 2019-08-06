describe('Client', () => {
  const visitClientPage = () => {
    cy.visit('/client');
  };

  const visitNewClientPage = () => {
    cy.visit('/client/new');
  };
  const fillClientForm = (client) => {
    if(client.name) {
      cy.get('#mat-input-0').clear();
      cy.get('#mat-input-0').type(client.name);
    }

    if(client.cpf) {
      cy.get('#mat-input-1').clear();
      cy.get('#mat-input-1').type(client.cpf);
    }

    if (client.phone) {
      cy.get('#mat-input-2').clear();
      cy.get('#mat-input-2').type(client.phone);
    }

    if (client.birthday) {
      cy.get('#mat-input-3').clear();
      cy.get('#mat-input-3').type(client.birthday);
    }

    if (client.address) {
      cy.get('#mat-input-4').clear();
      cy.get('#mat-input-4').type(client.address);
    }

    if(client.vehicle) {
      cy.get('.mat-select-arrow').click();
      cy.get('#mat-option-0 > .mat-option-text').click();
      cy.get('#mat-input-5').type(client.vehicle.manufecturer);
      cy.get('.mat-option-text').click();
      cy.get('#mat-input-6').type(client.vehicle.model);
      cy.get('.mat-option-text').click();
    }
  };

  const submitForm = () => {
    cy.get('.mat-raised-button').click();
  };

  const checkConfirmationMsg = (msg) => {
    cy.get('.toast-success').should('contain', msg);
  };

  const isInClientPage = () => {
    cy.url().should('include', '/client');
  }

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
    
    visitNewClientPage()
    fillClientForm(client);
    submitForm();

    isInClientPage();
    checkConfirmationMsg('Cliente cadastrado com sucesso');
  });

  it('should edit client', () => {
    const client = {
      name: 'Client Updated',
      address: 'Avenida circular'
    };

    visitClientPage();
    cy.get(':nth-child(1) > .cdk-column-actions > [mattooltip="Editar"]').click();
    cy.get('.mat-toolbar').should('contain', 'Editar Cliente');
    fillClientForm(client);
    submitForm();

    isInClientPage();
    checkConfirmationMsg('Cliente atualizado com sucesso')
  });

  it('should remove client', () => {
    visitClientPage();
    cy.get(':nth-child(2) > .cdk-column-actions > [mattooltip="Remover"]').click();
    cy.get('[cdkfocusinitial=""]').click();

    checkConfirmationMsg('Cliente removido com sucesso');
  });
});
