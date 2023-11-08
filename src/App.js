import './App.css'
import { useState, useEffect } from 'react';
import { getAlbums } from './apiCalls'

function App() {
  const [serverError, setServerError] = useState({hasError: true, message: ''})

useEffect(() => {
  getAlbums()
  .then(data => console.log(data))
  .catch(error => setServerError({hasError: true, message: `${error.message}`}))
}, [])


  return (
    <div className="App">
      APP
    </div>
  );
}

export default App;
