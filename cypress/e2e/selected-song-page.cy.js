describe('selected song page user flow', () => {

    beforeEach(() => {
        cy.stubAlbums().as('albumsStub')
        cy.stubSongs().as('songsStub')
        cy.stubGetAllSongLyrics().as('lyricsStub')
        
        .visit('http://localhost:3000')
        cy.wait(['@albumsStub', '@songsStub'])
        cy.get('.albums-container .album-card')
          .eq(0).as('1989Card')
          .get('@1989Card').find('.openCloseImg').click()
          .get('.song-list').children()

        cy.get('@1989Card').find('.song-list').children()
          .eq(0).click()
    })

    it('should display lyrics, album image and album songs', () => {
        const partialText = 'But people like me are gone forever when you say goodbye Stay Hey, all you had to do was stay Had me in the palm of your hand'

        cy.get('.song-lyrics-container h2').should('have.text', 'All You Had to Do Was Stay')
        cy.get('.song-lyrics-container').contains(partialText).should('exist')

        cy.get('.selected-album-songs .selected-album-image')
            .should('have.attr', 'alt', '1989 album cover')

        cy.get('.selected-album-songs .selected-album-song-list').children()
          .eq(0).should('have.text', 'All You Had to Do Was Stay')
        
        cy.get('.selected-album-songs .selected-album-song-list').children()
          .eq(1).should('have.text', 'Clean')
    })

    it('should change song lyrics if a different song is chosen', () => {
        const partialText = 'I screamed so loud But no one heard a thing'

        cy.get('.selected-album-songs .selected-album-song-list').children()
          .last().click()

        cy.get('.song-lyrics-container h2').should('have.text', 'Clean')
        cy.get('.lyrics-paragraph').contains(partialText).should('exist')

        cy.get('.home-container').click()
        cy.location('pathname').should('eq', '/')
    })

})