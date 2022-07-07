import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';

import Send from './components/Send';
import Receive from './components/Receive';
import Policy from './components/Policy';

function App() {

  const [id, setId] = useState('')
  const [sended, setSended] = useState(false)


  //Send the files to de dataBase
  const createLink = async files => {

    // Prepare the file to post
    const file = files[0]
    const fileTmp = {
      Id: uuidv4(),
      fileRaw: file
    }
    const body = new FormData();
    body.append(fileTmp.Id, fileTmp.fileRaw)

    //Change all the Hooks for the app
    setId(fileTmp.Id)

    setSended(true)

    //Making the post request
    const requestOptions = {
      method: 'POST',
      body: body
    };

    fetch('http://localhost:8000/upload', requestOptions)
    .then(async response => {
      console.log(response)
    })

    //Copy the ID to the clipboard
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(fileTmp.Id);
    } else {
      document.execCommand('copy', true, fileTmp.Id);
    }
  }

  // Change ID for recive the files
  const changeId = e => {
    setId(e.target.value)
  }

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route 
              path='/' 
              element={ <Send createLink={createLink} sended={sended} id={id} /> } />
            
            <Route 
              path='/receive' 
              element={ <Receive id={id} changeId={changeId} />} />
            
            <Route 
              path='/policy'
              element={ <Policy /> } />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
