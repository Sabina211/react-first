/// <reference types="cypress" />
import { BUN_DROP_TARGET_TOP, INGREDIENT_DROP_TARGET, INGREDIENT_GROUP } from "./selectors";

Cypress.Commands.add('addIngredient', (name: string) => {
  cy.get(INGREDIENT_GROUP).contains(name).wait(1000).trigger('dragstart');
  cy.get(INGREDIENT_DROP_TARGET).wait(1000).trigger('drop');
});

Cypress.Commands.add('addBun', (name) => {
  cy.get(INGREDIENT_GROUP).contains(name).should('be.visible').wait(1000).trigger('dragstart');
  cy.get(BUN_DROP_TARGET_TOP, { timeout: 5000 }).should('exist').wait(1000).trigger('drop', { force: true });
});