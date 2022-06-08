import { useState } from 'react';
import ContentEditable from 'react-contenteditable'
import cl from './NoteItem.module.css';

function NoteItem() {

    const [textArea, setTextArea] = useState('Denis lol');
    const [title, setTitle] = useState('File test');
    const [edit, setEdit] = useState(false);

    function handleEdit() {
        setEdit(!edit);
    }

    return (
        <form className={cl.form}>
            <div className={cl.wrapp}>
                <input disabled={edit} className={cl.input} onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
                <button type="button" className={cl.btn} onClick={() => handleEdit()}><img alt="edit" src="./img/icon/edit.png"/></button>
                <button type="button" className={cl.btn}><img alt="delete" src="./img/icon/delete.png" /></button>
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