import { Link } from 'react-router-dom';

import Logo from '../images/Logo.png';
import { ShieldLockFill } from 'react-bootstrap-icons';
import { HandIndexFill } from 'react-bootstrap-icons';
import { Wind } from 'react-bootstrap-icons';

import '../stylesheets/Landing.css';

function Landing () {
    return(
        <div className="landing-continer">
            <header className='landing-header'>
                <div className="landing-img-container">
                    <img 
                    src={Logo}
                    alt='Logo Bored Rabbit'
                    className='landing-logo'
                    />
                </div>
                <h1 className='landing-title'>BORED RABBIT</h1>
                <Link to='/send' className='landing-button'>ENTER THE HOLE</Link>
                <Link to='/receive' className='landing-link'>Or receive some files?</Link>
            </header>
            <h2 className='landing-description'>WE MAKE FILE SHARING SEEM MAGIC</h2>
            <div className='caracteristic-container'>
                <h3 className='caracteristic'> <ShieldLockFill className='icon' /> Privacy is first</h3>
                <h3 className='caracteristic end'> <HandIndexFill className='icon'/> As easy as drag and drop</h3>
                <h3 className='caracteristic'> <Wind className='icon'/> As quick as a hare</h3>
            </div>
            <footer className='footer'>
                <p>© copyright 2022 boredrabbit</p>
            </footer>
        </div>
    )
}

export default Landing;