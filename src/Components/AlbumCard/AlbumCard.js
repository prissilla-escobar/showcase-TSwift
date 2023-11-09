import './AlbumCard.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { albumCovers } from '../../albumCovers'
import dropdown from '../../Assets/download.png'
import {useState, useEffect} from 'react'
import { getAllSongs } from '../../apiCalls'

function AlbumCard( { album_id, title, setServerError } ) {
    const [songs, setSongs] = useState([])
    const singleAlbum = albumCovers.find(album => {
        if (album.id === album_id) {
            return album
        }
    })

    useEffect(() => {
        getAllSongs()
        .then(data => {
            setSongs(data)
        })
        .catch((error) => {
            setServerError({hasError: true, message: `${error.message}`});
          })
    }, [])

    const albumSongsList = songs.map((song) => {
        if (song.album_id === album_id) {
            return <div className='song-list'> {song.title} </div>
        }
    })

    return (
        <div className='album-card'>
            <img className='album-image' classID={`album-${title}`}  alt={`${title} album cover`} src={`${singleAlbum.image}`} />
            <div className='album-title'>
                <h2 className='album-title-font'>{title}</h2>
                <img className='dropimg' src={dropdown} />
                <div> {albumSongsList} </div>
            </div>
        </div>
    )
}

export default AlbumCard