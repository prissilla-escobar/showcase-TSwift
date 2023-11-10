import './AlbumCard.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { albumCovers } from '../../albumCovers'
import dropdown from '../../Assets/download.png'
import closeList from '../../Assets/upload.png'
import {useState, useEffect} from 'react'
import { getAllSongs } from '../../apiCalls'


function AlbumCard( { album_id, title, setServerError } ) {
    const [songs, setSongs] = useState([])
    const [showSongs, setShowSongs] = useState(false)
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
            return (
                <Link to={`/song/${song.song_id}`} key={song.song_id} style={{color: `inherit`, textDecoration: `inherit`}} className='songs'>
                    {song.title}
                </Link>
            )
        }
    })

    const handleDropdown = () => {
        setShowSongs(!showSongs)
    }

    return (
        <div className='album-card'>
            <img className='album-image' classID={`album-${title}`}  alt={`${title} album cover`} src={`${singleAlbum.image}`} />
            <div className='album-title'>
                <h2 className='album-title-font'>{title}</h2>
                {showSongs ? (
                <div className='album-title'>
                    <img
                        className='openCloseImg'
                        src={closeList}
                        onClick={handleDropdown}
                    />
                    <div className='song-list'>
                        {albumSongsList}
                    </div>
                </div>
            ) : (
                <img
                    className='openCloseImg'
                    src={dropdown}
                    onClick={handleDropdown}
                />
            )}
            </div>
        </div>
    )
}

export default AlbumCard