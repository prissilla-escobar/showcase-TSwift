import './Search.css'
import PropTypes from 'prop-types'

function Search({ setSearchText }) {
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    
    const handleInputChange = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <div className="search-area">
            <form onSubmit={handleSubmit}>
                <input 
                  type='search' 
                  id="searchInput" 
                  name="q" 
                  placeholder='Search Lyrics' 
                  onChange={handleInputChange}
                />
            </form>
        </div>
    )
}

export default Search

Search.propTypes = {
    setSearchText: PropTypes.func.isRequired,
}