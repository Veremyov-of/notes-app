import { useState, useContext, useEffect } from 'react';
import cl from './NoteItem.module.css';
import { MainContext } from './../../Context/index';

function NoteItem({id, item}) {
    const {notes, setNotes, setGlobalHashtags, globalhashtags} = useContext(MainContext);
    const [hashtags, setHashtags] = useState(item.hashtags);
    const [textArea, setTextArea] = useState(item.text);
    const [title, setTitle] = useState(item.title);
    const [edit, setEdit] = useState(false);

    const formElem = document.getElementById('form');
    const textElem = document.getElementById('text');

    const [textLength, setTextLength] = useState(item.textLength);
    const [formHeight, setFormHeight] = useState(item.formHeight);
    const [textHeight, setTextHeight] = useState(item.textHeight);

    function changeText(value) {
        setTextArea(value);
        checkHashtags(value);
        if(value.length === textLength) {
            setTextLength(textLength + 160);
            setFormHeight(formHeight + 100);
            setTextHeight(textHeight + 100);
        }
        formElem.style.height = `${formHeight}px`;
        textElem.style.height = `${textHeight}px`;
    }

    useEffect(() => {
        handleEdit(false);
    }, [])
 
    function deleteNote() {
        const index = notes.findIndex(item => item.id === id);
        notes.splice(index, 1)
        setNotes([...notes]);
    }

    function handleEdit(stateEdit = edit) {
        setEdit(!stateEdit);
        if(!stateEdit) {
            setNotes(notes.map(item => {
                if(item.id === id) {
                    item.title = title;
                    item.text = textArea;
                    item.formHeight = formHeight;
                    item.textHeight = textHeight; 
                    item.textLength = textLength;
                    item.hashtags = hashtags;
                    return item;
                }
                return item
            }))
            setGlobalHashtags([...globalhashtags, ...hashtags]);
        }
        
        
    }

    function checkHashtags (value) {  
        setHashtags([... new Set(value.split(' ').filter(item => item[0] === '#'))]);
    }

    function deleteHashtegs(index) {
        const gIndex = globalhashtags.indexOf(hashtags[index]);
        globalhashtags.splice(gIndex, 1);
        console.log(globalhashtags);
        setGlobalHashtags([...globalhashtags]);

        const arr = textArea.split(' ').filter(item => hashtags[index] !== item);
        setTextArea(arr.join(' '));
        setHashtags(hashtags.filter(item => item !== hashtags[index]));
    }

    return (
        <div id='form' className={cl.form}>
            <div className={cl.wrapp}>
                <input title="title note" disabled={edit} className={cl.input} onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
                <button title="edit" type="button" className={cl.btn} onClick={() => handleEdit()}>
                    <img alt="edit" src={edit ? `./img/icon/edit.png` : `./img/icon/done.png`}/>
                </button>
                <button title='delete note' onClick={deleteNote} type="button" className={cl.btn}>
                    <img alt="delete" src="./img/icon/delete.png" />
                </button>
            </div>
            <div id="text" className={cl.wrappText}>
                <div className={cl.container}>
                    {!edit ? 
                        textArea.split(' ').map((item, index) => {
                            item = item + ' ';
                            if(item[0] === '#') 
                                return <div key={index} className={cl.hashSpan}>{item}</div>;
                            return item;
                        })
                        :
                        textArea
                    }
                </div>
                <textarea disabled={edit} className={cl.textArea} onChange={(e) => changeText(e.target.value)} value={textArea}/>
            </div>
            <div className={cl.hashtags}>
                {hashtags.map((item, index) => (
                    <div title={edit ? 'to delete it, click edit' : 'delete hashteg'} onClick={edit ? null : () => deleteHashtegs(index)} className={cl.itemHashtag} key={index}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NoteItem;