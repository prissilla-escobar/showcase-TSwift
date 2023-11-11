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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('stubAlbums', () => {
    cy.intercept('GET', 'https://taylor-swift-api.sarbo.workers.dev/albums', {
        statusCode: 200,
        fixture: 'albums'
    })
})

Cypress.Commands.add('stubSongs', () => {
    cy.intercept('GET', `https://taylor-swift-api.sarbo.workers.dev/songs`, {
        statusCode: 200,
        fixture: 'allSongs'
    })
})

Cypress.Commands.add('stubGetAllSongLyrics', () => {
    cy.fixture('songLyrics.json').then((fixtureData) => {
      for (let i = 1; i <= 177; i++) {
        const url = `https://taylor-swift-api.sarbo.workers.dev/lyrics/${i}`
        cy.intercept('GET', url, {
          statusCode: 200,
          body: fixtureData[i - 1],
        }).as(`getAllSongLyrics_${i}`);
      }
    })
  })

  Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click();
})