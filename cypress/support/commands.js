// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("visitClientPage", () => {
  cy.visit('/client');
});

Cypress.Commands.add("visitClientPage", () => {
  cy.visit('/client');
});

Cypress.Commands.add("visitNewClientPage", () => {
  cy.visit('/client/new');
});

Cypress.Commands.add("fillClientForm", (client) => {
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
});

Cypress.Commands.add("submitClientForm", () => {
  cy.get('.mat-raised-button').click();
});

Cypress.Commands.add("checkConfirmationMsg", (msg) => {
  cy.get('.toast-success').should('contain', msg);
});

Cypress.Commands.add("isInClientPage", () => {
  cy.url().should('include', '/client');
});
