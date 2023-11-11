import './Search.css'

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