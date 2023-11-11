import './App.css'
import { useState, useEffect } from 'react'
import { getAlbums, getAllSongLyrics } from './apiCalls'
import AlbumContainer from './Components/AlbumContainer/AlbumContainer'
import { Route, Routes, useLocation } from 'react-router-dom'
import SelectedSongLyrics from './Components/SelectedSongLyrics/SelectedSongLyrics'
import ServerError from './Components/ServerError/ServerError'
import LoadingComponent from './Components/LoadingComponent/LoadingComponent'
import Header from './Components/Header/Header'

function App() {
  const [serverError, setServerError] = useState({hasError: false, message: ''})
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [allLyrics, setAllLyrics] = useState([])
  const [searchText, setSearchText] = useState('')
  const location = useLocation()
  
useEffect(() => {
  getAlbums()
    .then(data => {
      setAlbums(data)
      setIsLoading(false)
    })
    .catch(error => {
      setServerError({hasError: true, message: `${error.message}`})
    })
}, [])

useEffect(() => {
  getAllSongLyrics()
    .then(data => {
      setAllLyrics(data)
    })
    .catch(error => {
      setServerError({hasError: true, message: `${error.message}`})
    })
}, [])

useEffect(() => {
  if (location.pathname === '/') {
      document.body.classList.add('home-page')
  } else {
      document.body.classList.remove('home-page')
  }
}, [location])

const resetError = () => {
  setServerError({hasError: false, message: ''})
}

  return (
    <div className="App">
      <Header setSearchText={setSearchText} />
      {serverError.hasError ? (
      <ServerError resetError={resetError} serverError={serverError} />
    ) : isLoading ? (
        <LoadingComponent />
    ) : (
      <Routes>
        <Route path='/' element={<AlbumContainer albums={albums} setServerError={setServerError} setIsLoading={setIsLoading} searchText={searchText} allLyrics={allLyrics} />} />
        <Route path='/song/:id' element={<SelectedSongLyrics setServerError={setServerError} setIsLoading={setIsLoading} isLoading={isLoading} />} />
        <Route path='*' element={<ServerError resetError={resetError} serverError={serverError} />} />
      </Routes>
    )}
    </div>
  )
}

export default App
