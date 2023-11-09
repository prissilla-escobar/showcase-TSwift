import './App.css'
import { useState, useEffect } from 'react';
import { getAlbums } from './apiCalls'
import AlbumContainer from './Components/AlbumContainer/AlbumContainer';

function App() {
  const [serverError, setServerError] = useState({hasError: true, message: ''})
  const [albums, setAlbums] = useState([])

useEffect(() => {
  getAlbums()
    .then(data => {
      setAlbums(data)
    })
    .catch(error => {
      setServerError({hasError: true, message: `${error.message}`})
    })
}, [])


  return (
    <div className="App">
      <AlbumContainer albums={albums} />
    </div>
  );
}

export default App;
