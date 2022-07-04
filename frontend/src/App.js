import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';


import Send from './components/Send';
import Receive from './components/Receive';
import Policy from './components/Policy';

function App() {

  const [id, setId] = useState('')
  const [sended, setSended] = useState(false)

  const createLink = async (files, navigate) => {

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

    //Copy the ID
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(fileTmp.Id);
    } else {
      document.execCommand('copy', true, fileTmp.Id);
    }
  }

  const changeId = e => {
    console.log(e.target.value)
    setId(e.target.value)
  }

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={< Send createLink={createLink} sended={sended} id={id}  />}></Route>
            <Route path={`/receive`} element={< Receive id={id} changeId={changeId} />}></Route>
            <Route path={`/policy`} element={<Policy />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
