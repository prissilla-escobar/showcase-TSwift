describe('selected song page user flow', () => {

    beforeEach(() => {
        cy.stubAlbums().as('albumsStub')
        cy.stubSongs().as('songsStub')
        cy.stubGetAllSongLyrics().as('lyricsStub')
        
        .visit('http://localhost:3000')
        cy.wait(['@albumsStub', '@songsStub'])
    })

    it('should display an error message for 500 error for songs', () => {
        cy.intercept('GET', 'https://taylor-swift-api.sarbo.workers.dev/songs', {
            statusCode: 500,
            body: { error: 'Internal Server Error' },
          })
          cy.visit('http://localhost:3000')
          cy.contains('p', 'Oh no! Error fetching songs: Songs not found. It\'s me. Hi. I\'m the problem, it\'s me 👋')
          cy.get('button').click()
          cy.url().should('eq', 'http://localhost:3000/')
    })

    it('should display an error message for 400 error for songs', () => {
        cy.intercept('GET', 'https://taylor-swift-api.sarbo.workers.dev/songs', {
            statusCode: 400,
            body: { error: 'Songs not found' },
          })
          cy.visit('http://localhost:3000')
          cy.contains('p', 'Oh no! Error fetching songs: Songs not found. It\'s me. Hi. I\'m the problem, it\'s me 👋')
          cy.get('button').click()
          cy.url().should('eq', 'http://localhost:3000/')
    })

    it('should display an error message for 500 error for albums', () => {
        cy.intercept('GET', 'https://taylor-swift-api.sarbo.workers.dev/albums', {
            statusCode: 500,
            body: { error: 'Internal Server Error' },
          })
          cy.visit('http://localhost:3000')
          cy.contains('p', 'Oh no! Error fetching albums: Album not found. It\'s me. Hi. I\'m the problem, it\'s me 👋')
          cy.get('button').click()
          cy.url().should('eq', 'http://localhost:3000/')
    })
})