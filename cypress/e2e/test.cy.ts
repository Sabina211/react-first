/// <reference types="cypress" />
describe('service is available', function() {
  it('should be available on localhost:8080', function() {
    cy.visit('http://localhost:8080');
  });
});