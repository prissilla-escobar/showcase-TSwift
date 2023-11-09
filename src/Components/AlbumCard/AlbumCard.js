import './AlbumCard.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { albumCovers } from '../../albumCovers'

function AlbumCard( { album_id, title } ) {

    const singleAlbum = albumCovers.find(album => {
        if (album.id === album_id) {
            return album
        }
    })

    return (
        <div className='album-card'>
            <img className='album-image' classID={`album-${title}`}  alt={`${title} album cover`} src={`${singleAlbum.image}`} />
            <div className='album-title'>
                <h2>{title}</h2>
            </div>
        </div>
    )
}

export default AlbumCard