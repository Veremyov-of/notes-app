import { useState } from 'react';

import './App.css';
import ListOfNotes from './components/ListOfNotes/ListOfNotes';
import Navbar from './components/Navbar/Navbar';
import { MainContext } from './Context';

function App() {

  const [navbar, setNavbar] = useState(true);
  const [notes, setNotes] = useState([]);
  
  return (
    <MainContext.Provider value={{
      navbar,
      setNavbar,
      notes,
      setNotes
    }}>
      <div className="App">
        <div>
          <Navbar />
          <ListOfNotes />
        </div>
      </div>
    </MainContext.Provider>
  );
}

export default App;
