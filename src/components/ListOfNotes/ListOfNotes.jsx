import NoteItem from '../NoteItem/NoteItem';
import cl from './ListOfNotes.module.css';
import { useContext, useEffect} from 'react';
import { MainContext } from './../../Context/index';

function ListOfNotes() {
    const {navbar, notes, selectTag, noteFilter, setNoteFilter} = useContext(MainContext);
    useEffect(() => {
        if(selectTag !== 'none') {
            setNoteFilter(notes.filter(item => item.hashtags.includes(selectTag)));
        } else {
            setNoteFilter([...notes]);
        }
    }, [selectTag, notes])
    return (
        <div className={navbar ? `${cl.listOfNotes} ${cl.active}` : cl.listOfNotes}>
            {noteFilter.map((item) => <NoteItem key={item.id} id={item.id} item={item}/>)}
        </div>
      );
}

export default ListOfNotes;