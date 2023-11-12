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

  Cypress.Commands.add('assertAlbumCard', (index, { alt, title, openCloseImgAlt, openCloseImgSelector, numberSongs, song1, song2 }) => {
    cy.get('.albums-container .album-card')
      .eq(index).should('exist')
      .as('albumCard')
      .find('.album-image').should('be.visible')
      .invoke('attr', 'alt').should('eq', alt)

    cy.get('@albumCard')
    .within(() => {
      cy.get('@albumCard')
      .find('h2').should('be.visible')
      .should('have.text', title)
  
      cy.get('@albumCard')
        .find(openCloseImgSelector).should('exist')
        .invoke('attr', 'alt').should('eq', openCloseImgAlt)
      
      cy.get('@albumCard')
        .find(openCloseImgSelector).click()

      cy.get('.song-list').children().should('have.length', numberSongs)
      cy.get('.song-list').children().first().should('have.text', song1)
      cy.get('.song-list').children().last().should('have.text', song2)
    })
  })