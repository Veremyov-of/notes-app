import NoteItem from '../NoteItem/NoteItem';
import cl from './ListOfNotes.module.css';
import { useContext } from 'react';
import { MainContext } from './../../Context/index';

function ListOfNotes() {
    const {navbar, notes} = useContext(MainContext);
    return (
        <div className={navbar ? `${cl.listOfNotes} ${cl.active}` : cl.listOfNotes}>
            {notes.map((item) => <NoteItem key={item.id} id={item.id} item={item}/>)}
        </div>
      );
}

export default ListOfNotes;