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

  const download = async () => {
    let petition = await fetch(`http://localhost:8000/get/${id}`)
    let url = await petition.json()

    try {
      saveAs(url.url, url.name)
    } catch (e) {
      console.log(e)
    }

    saveAs(url.url, url.name)
    setName(url.name)
    setDownloaded(true)
  }

  const deleteFile = async() => {
    let response = await fetch(`http://localhost:8000/delete/${name}`, {
      method: "DELETE",
      headers: {
          'Content-type': 'application/json'
      }
  })
    response = await response.json()
    console.log(response.status)
    setDownloaded(false)
  }

  return(
    <>
      <Navbar />

      <div className="receive-container">
        <h1 className="receive-title">GET</h1>
        <form className="receive-download">
          <input type='text' className='receive-input' placeholder="File ID" onChange={(e) => changeId(e)}></input>
          <FolderFill className="receive-icon"/>
        </form>
        <div className="receive-divider"></div>
        <div className="receive-button-container">
          <Button style='white' onClick={download}>Download yours files!</Button>
        </div>
        <Link to='/' className='receive-share'>Send something?</Link>
      </div>

      <div className={`${downloaded ? 'recived-download' : 'recived-notDownload'}`}>
        <div className='recived-download-container'>
          <h2 className='recived-download-title'>THE DOWNLOAD HAS STARTED!</h2>
          <p className='recived-download-text'>To delete de file from the server click the botton</p>
          <Button style='red small-button' onClick={deleteFile}>Delete file</Button>
        </div>
      </div>
    </>
  )
}

export default Receive;