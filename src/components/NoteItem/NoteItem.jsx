import { useState, useContext, useEffect } from 'react';
import ContentEditable from 'react-contenteditable'
import cl from './NoteItem.module.css';
import { MainContext } from './../../Context/index';

function NoteItem({id}) {
    const {notes, setNotes} = useContext(MainContext);

    const [textArea, setTextArea] = useState('some text...');
    const [title, setTitle] = useState('Empty Note');
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        handleEdit(false);
    }, [])

    function handleEdit(stateEdit = edit) {
        setEdit(!stateEdit);
        if(!stateEdit) {
            setNotes(notes.map(item => {
                if(item.id === id) {
                    item.title = title;
                    item.text = textArea
                    return item;
                }
                return item
            }))
        }
    }

    return (
        <form className={cl.form}>
            <div className={cl.wrapp}>
                <input disabled={edit} className={cl.input} onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
                <button type="button" className={cl.btn} onClick={() => handleEdit()}>
                    <img alt="edit" src={edit ? `./img/icon/edit.png` : `./img/icon/done.png`}/>
                </button>
                <button type="button" className={cl.btn}>
                    <img alt="delete" src="./img/icon/delete.png" />
                </button>
            </div>
            <div className={cl.wrappText}>
                <ContentEditable disabled={edit} className={cl.ContentEditable} html={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            </div>
            <div>

            </div>
        </form>
    );
}

export default NoteItem;