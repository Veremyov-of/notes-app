import { useContext, useEffect} from 'react';
import { MainContext } from './../../Context/index';

//components
import NoteItem from '../NoteItem/NoteItem';

//css
import '../../style/styleComponents/ListOfNote/ListOfNotes.scss';

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
    }, [notes]);
    return (
        <div className={navbar ? `listOfNotes active` : `listOfNotes`}>
            {noteFilter.map((note) => <NoteItem key={note.id} note={note}/>)}
        </div>
      );
}

export default ListOfNotes;