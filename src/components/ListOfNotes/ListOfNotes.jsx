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
    }, [notes]);
    return (
        <div className={navbar ? `${cl.listOfNotes} ${cl.active}` : cl.listOfNotes}>
            {noteFilter.map((item) => <NoteItem key={item.id} item={item}/>)}
        </div>
      );
}

export default ListOfNotes;