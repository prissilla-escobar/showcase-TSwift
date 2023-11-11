import './AlbumCard.css'
import { Link } from 'react-router-dom'
import { albumCovers } from '../../albumCovers'
import dropdown from '../../Assets/download.png'
import closeList from '../../Assets/upload.png'
import {useState, useEffect } from 'react'
import { getAllSongs } from '../../apiCalls'
import PropTypes from 'prop-types'


function AlbumCard( { album_id, title, setServerError, searchText, allLyrics } ) {
    const [songs, setSongs] = useState([])
    const [showSongs, setShowSongs] = useState(false)
    const singleAlbum = albumCovers.find(album => {
        if (album.id === album_id) {
            return album
        } else {
            return null
        }
    })

    const filteredSongs = songs.filter(song => {
        const matchingLyrics = allLyrics.find(lyric => lyric.song_id === song.song_id)
        if (searchText && matchingLyrics) {
            return matchingLyrics.lyrics.toLowerCase().includes(searchText.toLowerCase())
        } else {
            return true
        }
      })

    useEffect(() => {
        getAllSongs()
        .then(data => {
            setSongs(data)
        })
        .catch((error) => {
            setServerError({hasError: true, message: `${error.message}`})
          })
    }, [setServerError])

    const albumSongsList = songs.map((song) => {
        if (song.album_id === album_id) {
            return (
                <Link to={`/song/${song.song_id}`} key={song.song_id} style={{color: `inherit`, textDecoration: `inherit`}} className='songs'>
                    {song.title}
                </Link>
            )
        } else {
            return null
        }
    })

    const filteredSongsList = filteredSongs.map((songFiltered) => {
        if (songFiltered.album_id === album_id) {
            return (
                <Link to={`/song/${songFiltered.song_id}`} key={songFiltered.song_id} style={{color: `inherit`, textDecoration: `inherit`}} className='songs'>
                    {songFiltered.title}
                </Link>
            )
        } else {
            return null
        }
    })

    const numFilteredSongs = filteredSongs.filter((song) => song.album_id === album_id).length

    const handleDropdown = () => {
        setShowSongs(!showSongs)
    }

    return (
            <div className='album-card'>
                <img className='album-image' classID={`album-${title}`}  alt={`${title} album cover`} src={`${singleAlbum.image}`} />
                <div className='album-title'>
                    <h2 className='album-title-font'>{title}</h2>
                    {searchText && <div className='song-count'>{`${numFilteredSongs} songs with "${searchText}"`}</div>}
                    {showSongs ? (
                    <div className='album-title'>
                        <img
                            className='openCloseImg'
                            alt='music symbol with an up arrow to close song list'
                            src={closeList}
                            onClick={handleDropdown}
                        />
                        <div className='song-list'>
                            {searchText ? filteredSongsList : albumSongsList}
                        </div>
                    </div>
                ) : (
                    <img
                        className='openCloseImg'
                        alt='music symbol with a down arrow to open song list'
                        src={dropdown}
                        onClick={handleDropdown}
                    />
                )}
                </div>
            </div>

    )
}

export default AlbumCard

AlbumCard.propTypes = {
    album_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    setServerError: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    allLyrics: PropTypes.array.isRequired,
  }