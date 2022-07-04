import Logo from '../images/Logo.png';
import '../stylesheets/Navbar.css';
import { Link } from 'react-router-dom'; 
import { InfoCircleFill, Github } from 'react-bootstrap-icons';

function Navbar(){
  return(
    <div className='all-container'>
      <nav className='navbar-container'>
        <div className='navbar-item'>
          <a href='https://github.com/Manuel0516/bored-rabbit-simplified' className='navbar-link'><Github /></a>
        </div>
        <div className='navbar-item'>
          <img
            className='navbar-logo'
            src={Logo}
            alt='Logo Bored Rabbit' />
        </div>
        <div className='navbar-item'>
          <Link to='/policy' className='navbar-link'><InfoCircleFill /></Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;