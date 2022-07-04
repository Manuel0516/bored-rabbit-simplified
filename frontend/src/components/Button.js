import { Children } from 'react';
import '../stylesheets/Button.css';

function Button({ children, style, onClick }){
  return(
    <button className={`button ${style}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;