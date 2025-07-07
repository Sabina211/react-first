/// <reference types="cypress" />
import { BUN_DROP_TARGET_TOP, INGREDIENT_DROP_TARGET, INGREDIENT_GROUP } from "./selectors";

Cypress.Commands.add('addIngredient', (name: string) => {
  cy.get(INGREDIENT_GROUP).contains(name).trigger('dragstart');
  cy.get(INGREDIENT_DROP_TARGET).trigger('drop');
});

Cypress.Commands.add('addBun', (name) => {
  cy.get(INGREDIENT_GROUP).contains(name).should('be.visible').trigger('dragstart');
  cy.get(BUN_DROP_TARGET_TOP, { timeout: 5000 }).should('exist').trigger('drop', { force: true });
});