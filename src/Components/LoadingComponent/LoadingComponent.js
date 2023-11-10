import './LoadingComponent.css'
import { Hearts } from 'react-loading-icons'

function LoadingComponent() {

    return (
        <div className='loading-container'>
            <Hearts />
            <h1 className='loading-text'>Loading...</h1>
        </div>
    )
}

export default LoadingComponent