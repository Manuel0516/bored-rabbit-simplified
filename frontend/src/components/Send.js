import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../stylesheets/Send.css';

import Navbar from './Navbar';
import Button from './Button';

import { PlusSquareDotted } from 'react-bootstrap-icons';

function Send({ createLink, sended, id }){

  let navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [shareText, setShareText] = useState('Share yours files!')
  const inputRef = useRef(null);


  const handleFiles = e => {
    setShareText(e[0].name)
  }


  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]){
      setFiles(e.target.files)
      handleFiles(e.target.files)
    }
  }

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(e.dataTransfer.files)
      handleFiles(e.dataTransfer.files);
    }
  }

  return(
    <>
      <Navbar />
      <form 
        encType='multipart/form-data'
        className='share-container' 
        onDragEnter={handleDrag} 
        onDragLeave={handleDrag} 
        onDragOver={handleDrag} 
        onDrop={handleDrop} 
        onSubmit={(e) => e.preventDefault()}>

        <h1 className='share-title'>BORED RABBIT</h1>
        
        <input ref={inputRef} type="file" name='file' className='share-input' id="file-upload" multiple={false} onChange={handleChange}/>
        
        <label className={`share-drag ${dragActive ? "active" : ""}`} htmlFor='file-upload' >
          <PlusSquareDotted className='share-add'/>
          <h3 className='share-text'>{shareText}</h3>
        </label>
        
        <div className='share-divider'></div>
        
        <div className='share-button-container'>
          <button className='button dark' onClick={() => createLink(files, navigate)}>Send some files!</button>
        </div>

        <Link to='/receive' className='share-receive'>Receive something?</Link>
      </form>
      <div className={`${sended ? 'share-sended' : 'share-notSended'}`}>
        <div className='share-sended-container'>
          <h2 className='share-sended-title'>The ID of your content:</h2>
          <p className='share-sended-text'>{id}</p>
          <h2 className='share-sended-title'>Copied to your clipboard!</h2>
          <Button style='white small-button'><Link to='/receive' className='white link-button'>Receive</Link></Button>
        </div>
      </div>
    </>
  )
}

export default Send;