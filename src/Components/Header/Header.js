import './Header.css'
import Search from '../Search/Search'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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