import './AlbumContainer.css'
import AlbumCard from '../AlbumCard/AlbumCard'
import PropTypes from 'prop-types'

function AlbumContainer({ albums, setServerError, searchText, allLyrics }) {
    const sortedAlbums = albums.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
    
    const albumCards = sortedAlbums.map(album => {
        return (
            <AlbumCard 
                album_id={album.album_id}
                key={album.album_id}
                title={album.title}
                album_releaseDate={album.release_date}
                setServerError={setServerError}
                searchText={searchText}
                allLyrics={allLyrics}
            />
        )
    })

    return (
        <div>
        <h1 className='instructions'>Lyrics of Taylor Swift</h1>
            <div className='album-container-wrapper'>
                <div className='albums-container'>
                    {albumCards}
                </div>
            </div>
        </div>
    )
}

export default AlbumContainer

AlbumContainer.propTypes = {
    albums: PropTypes.array.isRequired,
    setServerError: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    allLyrics: PropTypes.array.isRequired,
  }