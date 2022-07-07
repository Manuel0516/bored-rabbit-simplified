import { saveAs } from 'file-saver';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from "./Navbar";
import Button from "./Button";

import '../stylesheets/Receive.css';

import { FolderFill } from 'react-bootstrap-icons';

function Receive({ id, changeId }){

  const [downloaded, setDownloaded] = useState(false)
  const [name, setName] = useState('')

  // Download the files
  const download = async () => {

    // Make petition
    let petition = await fetch(`http://localhost:8000/get/${id}`)
    let url = await petition.json()

    // Try to save the files from the petition
    saveAs(url.url, url.name)

    // Chage the hooks states
    setName(url.name)
    setDownloaded(true)
  }

  // Delete the files from de dataBase
  const deleteFile = async() => {

    // Make petition to delete
    let response = await fetch(`http://localhost:8000/delete/${name}`, {
      method: "DELETE",
      headers: {
          'Content-type': 'application/json'
      }
    })

    // Print response
    response = await response.json()
    console.log(response.status)

    // Chage the hooks states
    setDownloaded(false)
  }

  return(
    <>
      <Navbar />

      <div className="receive-container">

        <h1 className="receive-title">GET</h1>
        
        <form className="receive-download">
          <input 
            type='text' 
            className='receive-input' 
            placeholder="File ID" 
            onChange={ (e) => changeId(e) } />
          <FolderFill className="receive-icon"/>
        </form>
        
        <div className="receive-divider"></div>
        
        <div className="receive-button-container">
          <Button style={'white'} onClick={ download }>Download yours files!</Button>
        </div>

        <Link to='/' className='receive-share'>Send something?</Link>
      </div>

      <div className={`${downloaded ? 'recived-download' : 'recived-notDownload'}`}>
        
        <div className='recived-download-container'>
          <h2 className='recived-download-title'>THE DOWNLOAD HAS STARTED!</h2>
          
          <p className='recived-download-text'>To delete de file from the server click the botton</p>
          
          <Button style={'red small-button'} onClick={deleteFile}>Delete file</Button>
        </div>
      
      </div>
    </>
  )
}

export default Receive;