import './AlbumContainer.css'
import PropTypes from 'prop-types'
import AlbumCard from '../AlbumCard/AlbumCard'

function AlbumContainer({ albums }) {
    const sortedAlbums = albums.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
    
    const albumCards = sortedAlbums.map(album => {
    return (
        <AlbumCard 
            album_id={album.album_id}
            key={album.album_id}
            title={album.title}
            album_releaseDate={album.release_date}
        />
    )
    })

    return (
        <div className='album-container-wrapper'>
            <div className='albums-container'>
                {albumCards}
            </div>
        </div>
    )
}

export default AlbumContainer