import './App.css'
import { useState, useEffect } from 'react';
import { getAlbums } from './apiCalls'
import AlbumContainer from './Components/AlbumContainer/AlbumContainer';
import { Route, Routes, useLocation } from 'react-router-dom';
import SelectedSongLyrics from './Components/SelectedSongLyrics/SelectedSongLyrics'

function App() {
  const [serverError, setServerError] = useState({hasError: true, message: ''})
  const [albums, setAlbums] = useState([])
  const location = useLocation()
  
useEffect(() => {
  getAlbums()
    .then(data => {
      setAlbums(data)
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

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AlbumContainer albums={albums} setServerError={setServerError} />} />
        <Route path='/song/:id' element={<SelectedSongLyrics setServerError={setServerError} />} />
      </Routes>
    </div>
  );
}

export default App;
