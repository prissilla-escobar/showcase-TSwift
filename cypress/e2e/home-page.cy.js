describe('selected song page user flow', () => {

    beforeEach(() => {
        cy.stubAlbums().as('albumsStub')
        cy.stubSongs().as('songsStub')
        cy.stubGetAllSongLyrics().as('lyricsStub')
        
        .visit('http://localhost:3000')
        cy.wait(['@albumsStub', '@songsStub'])
    })

    it('should display header, search input and all albums', () => {
        cy.location('pathname').should('eq', '/')
        cy.get('.instructions')
          .contains('h1', 'Lyrics of Taylor Swift')
        
        cy.get('.search-area form input[type="search"]').should('exist')
          .should('have.attr', 'id', 'searchInput')
          .should('have.attr', 'name', 'q')
          .should('have.attr', 'placeholder', 'Search Lyrics')

        cy.get('.album-container-wrapper .albums-container').children().should('have.length', 3)
    })

    it('should display songs on dropdown', () => {
        cy.get('.albums-container .album-card')
          .eq(0).should('exist')
          .as('albumCard')
          .find('.album-image').should('be.visible')
          .invoke('attr', 'alt').should('eq', '1989 album cover')
        cy.get('@albumCard')
          .find('h2').should('be.visible')
          .should('have.text', '1989')
        cy.get('@albumCard')
          .find('.openCloseImg').should('exist')
            .invoke('attr', 'alt').should('eq', 'music symbol with a down arrow to open song list')
    })

})