import './SelectedSongLyrics.css'
import { useState, useEffect } from 'react'
import { getSongLyrics, getAllSongs } from '../../apiCalls'
import { useParams, Link } from 'react-router-dom'
import { albumCovers } from '../../albumCovers'
import home from '../../Assets/home (3).png'

function SelectedSongLyrics({ setServerError }) {
    const [songLyrics, setSongLyrics] = useState('')
    const [songs, setSongs] = useState([])
    const [albumID, setAlbumID] = useState('')
    const [selAlbum, setSelAlbum] = useState('')
    const { id } = useParams()
    const parsedId = parseInt(id, 10)

    useEffect(() => {
        getSongLyrics(id)
          .then(data => {
            setSongLyrics(data)
          })
          .catch(error => {
            setServerError({hasError: true, message: `${error.message}`})
          })
    }, [id, setServerError])

    useEffect(() => {
        getAllSongs()
            .then(data => {
                setSongs(data)
                return data
            })
            .then(data => {
                const foundAlbumID = data.find(s => s.song_id === parsedId)
                if (foundAlbumID) {
                    const foundSelAlbum = albumCovers.find(album => album.id === foundAlbumID.album_id)
                    if (foundSelAlbum) {
                        setSelAlbum(foundSelAlbum)
                    }
                    setAlbumID(foundAlbumID.album_id)
                }
            })
            .catch(error => {
                setServerError({ hasError: true, message: `${error.message}` })
            })
    }, [id, albumCovers, setServerError])

    const formatedLyrics = (lyrics) => {
        if (lyrics) {
            return lyrics.replace(/([A-Z])/g, '<br>$1')
        }
        return ''
    }

    const selectedAlbumSongs = songs.map(single => {
        if (single.album_id === albumID) {
            return (
                <Link to={`/song/${single.song_id}`} key={single.song_id} style={{color: `inherit`, textDecoration: `inherit`}} className='songss'>
                    {single.title}
                </Link>
                )
        }
    })

    return (
        <div className='selected-song-container'>
            <div className='song-lyrics-container song-lyrics-background'>
            <Link to={'/'} className='home-container'>
                <img className='home-button' src={home} style={{color: `inherit`, textDecoration: `inherit`}} />
            </Link>
                <h2 className='lyrics-title'>{songLyrics.song_title}</h2>
                <div className='home-button'></div>
                <p className='lyrics-paragraph'dangerouslySetInnerHTML={{ __html: formatedLyrics(songLyrics.lyrics) }}></p>
            </div>
            <div className='selected-album-songs'>
                <img className='selected-album-image' classID={`album-${selAlbum.title}`}  alt={`${selAlbum.title} album cover`} src={`${selAlbum.image}`} />
                <div className='selected-album-song-list'>
                    {selectedAlbumSongs}
                </div>
            </div>
        </div>
    )
}

export default SelectedSongLyrics