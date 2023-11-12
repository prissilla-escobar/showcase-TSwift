import './ServerError.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ServerError({ resetError, serverError}) {

    const errorMessage = serverError && serverError.message ? serverError.message : 'Unknown error occurred.'

    return (
        <div className='serverError'>
            <img className='error-image' alt='scooter ban sign' src='https://cdn4.iconfinder.com/data/icons/prohibited-red-signs/122/Prohibition_sign_045-512.png' /> 
            <p className='error-message'>Oh no! {errorMessage} <br />
            It's me. Hi. I'm the problem, it's me 👋</p> 
            <Link to={'/'} onClick={() => {resetError()}} className='home-link'>
                <button className='return-button'>Return Home</button>
            </Link>
        </div>
    )
}

export default ServerError

ServerError.propTypes = {
    serverError: PropTypes.shape({
        hasError: PropTypes.bool.isRequired,
        message:  PropTypes.string.isRequired,
    }),
    resetError: PropTypes.func.isRequired,
  }