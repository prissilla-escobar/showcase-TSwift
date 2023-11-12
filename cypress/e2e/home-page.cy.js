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
        cy.assertAlbumCard(0, {
            alt: '1989 album cover',
            title: '1989',
            openCloseImgAlt: 'music symbol with a down arrow to open song list',
            openCloseImgSelector: '.openCloseImg',
            numberSongs: 2,
            song1: "All You Had to Do Was Stay",
            song2: "Clean"
        })
        cy.assertAlbumCard(1, {
            alt: 'Reputation album cover',
            title: 'Reputation',
            openCloseImgAlt: 'music symbol with a down arrow to open song list',
            openCloseImgSelector: '.openCloseImg',
            numberSongs: 2,
            song1:"Delicate",
            song2: "So It Goes…"
        })
        cy.assertAlbumCard(2, {
            alt: 'Midnights album cover',
            title: 'Midnights',
            openCloseImgAlt: 'music symbol with a down arrow to open song list',
            openCloseImgSelector: '.openCloseImg',
            numberSongs: 2,
            song1:"Hits Different",
            song2: "You're Losing Me"
        })

        cy.get('.albums-container .album-card')
          .eq(0)
          .get('.song-list')
            .eq(0).click()
            cy.location('pathname').should('eq', '/song/4')
    })
})