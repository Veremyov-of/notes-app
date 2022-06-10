import { useState } from 'react';

import './App.css';
import ListOfNotes from './components/ListOfNotes/ListOfNotes';
import Navbar from './components/Navbar/Navbar';
import { MainContext } from './Context';

function App() {

  const [navbar, setNavbar] = useState(true);
  const [notes, setNotes] = useState([]);
  const [globalhashtags, setGlobalHashtags] = useState(['none',]);
  const [selectTag, setSelectTag] = useState('none');
  const [noteFilter, setNoteFilter] = useState([]);
  
  return (
    <MainContext.Provider value={{
      navbar,
      setNavbar,
      notes,
      setNotes,
      globalhashtags,
      setGlobalHashtags,
      selectTag,
      setSelectTag,
      noteFilter,
      setNoteFilter,
    }}>
      <div className="App">
        <div>
          <Navbar />
          <ListOfNotes />
          {/* <CompTest /> */}
        </div>
      </div>
    </MainContext.Provider>
  );
}

export default App;
