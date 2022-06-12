import { useState } from 'react';

//components
import ListOfNotes from './components/ListOfNotes/ListOfNotes';
import Navbar from './components/Navbar/Navbar';

//context
import { MainContext } from './Context';

//hooks
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [navbar, setNavbar] = useState(true);
  const [globalhashtags, setGlobalHashtags] = useState(['none',]);
  const [selectTag, setSelectTag] = useState('none');
  const [noteFilter, setNoteFilter] = useState([]);

  const initialState = {
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
}
  
  return (
    <MainContext.Provider value={initialState}>
      <div className='main'>
          <Navbar />
          <ListOfNotes />
      </div>
    </MainContext.Provider>
  );
}

export default App;
