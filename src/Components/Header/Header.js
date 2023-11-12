import './Header.css'
import Search from '../Search/Search'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

function Header({ setSearchText }) {
    const { pathname } = useLocation()
    const atHomePath = pathname === '/'

    useEffect(() => {
        if (atHomePath) {
            setSearchText('')
        }
    }, [atHomePath, setSearchText])

    return (
        <div className='header'>
            {atHomePath && <Search setSearchText={setSearchText} />}
        </div>
    )
}

export default Header

Header.propTypes = {
    setSearchText: PropTypes.func.isRequired,
  }