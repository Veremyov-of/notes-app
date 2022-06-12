import { useContext, useEffect} from 'react';
import { MainContext } from './../../Context/index';

//components
import NoteItem from '../NoteItem/NoteItem';

//css
import cl from './ListOfNotes.module.css';

function ListOfNotes() {
    const {navbar, notes, selectTag, noteFilter, setNoteFilter, setGlobalHashtags} = useContext(MainContext);
    
    useEffect(() => {
        if(selectTag !== 'none') {
            setNoteFilter(notes.filter(item => item.hashtags.includes(selectTag)));
        } else {
            setNoteFilter([...notes]);
        }
    }, [ notes, selectTag]);

    useEffect(() => {
        let arr = notes.map(item => item.hashtags).flat();
        setGlobalHashtags([...new Set(['none', ...arr])]);
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);
    return (
        <div className={navbar ? `${cl.listOfNotes} ${cl.active}` : cl.listOfNotes}>
            {noteFilter.map((note) => <NoteItem key={note.id} note={note}/>)}
        </div>
      );
}

export default ListOfNotes;