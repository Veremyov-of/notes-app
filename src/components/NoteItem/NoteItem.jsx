import { useState, useContext, useEffect } from 'react';
import cl from './NoteItem.module.css';
import { MainContext } from './../../Context/index';

function NoteItem({id}) {
    const {notes, setNotes} = useContext(MainContext);

    const [hashtags, setHashtags] = useState([]);
    const [textArea, setTextArea] = useState('some text...');
    const [title, setTitle] = useState('Empty Note');
    const [edit, setEdit] = useState(false);

    const formElem = document.getElementById('form');
    const textElem = document.getElementById('text');

    const [textLength, setTextLength] = useState(160);
    const [formHeight, setFormHeight] = useState(250);
    const [textHeight, setTextHeight] = useState(150)

    function changeText(value) {
        setTextArea(value);
        checkHashtags(value);
        if(value.length === textLength) {
            setTextLength(textLength + 160);
            setFormHeight(formHeight + 100);
            setTextHeight(textHeight + 100);
            console.log(formElem.style.height);
            console.log(textElem.style.height);
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
                    return item;
                }
                return item
            }))
        }
    }

    function checkHashtags (value) {  
        setHashtags(value.split(' ').filter(item => item[0] === '#'));
    }

    function deleteHashteg(index) {
        const arr = textArea.split(' ').filter(item => hashtags[index] !== item);
        setTextArea(arr.join(' '));
        hashtags.splice(index, 1);
        setHashtags([...hashtags]);
    }


    return (
        <div id='form' className={cl.form}>
            <div className={cl.wrapp}>
                <input disabled={edit} className={cl.input} onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
                <button type="button" className={cl.btn} onClick={() => handleEdit()}>
                    <img alt="edit" src={edit ? `./img/icon/edit.png` : `./img/icon/done.png`}/>
                </button>
                <button onClick={deleteNote} type="button" className={cl.btn}>
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
                    <div onClick={edit ? null : () => deleteHashteg(index)} className={cl.itemHashtag} key={index}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NoteItem;