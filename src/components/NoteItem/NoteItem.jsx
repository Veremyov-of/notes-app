import { useState, useContext, useEffect } from 'react';
import cl from './NoteItem.module.css';
import { MainContext } from './../../Context/index';
import HashtagsNote from '../HashtagsNote/HashtagsNote';
import TextArea from '../TextArea/TextArea';
import HeaderNote from './../HeaderNote/HeaderNote';

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

    function changeTitle(value) {
        setTitle(value);
    }
    console.log('refState')

    useEffect(() => {
        handleEdit(false);
    }, [])
 
    function deleteNote() {
        const index = notes.findIndex(item => item.id === id);
        
        for(let i = 0; i < hashtags.length; i++) {
            let index = globalhashtags.indexOf(hashtags[i]);
            globalhashtags.splice(index, 1);
            setGlobalHashtags([...globalhashtags]);
        }

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
        setGlobalHashtags([...globalhashtags]);

        const arr = textArea.split(' ').filter(item => hashtags[index] !== item);
        setTextArea(arr.join(' '));
        setHashtags(hashtags.filter(item => item !== hashtags[index]));
    }

    return (
        <div id='form' className={cl.form}>
            <HeaderNote edit={edit} deleteNote={deleteNote} handleEdit={handleEdit} title={title} changeTitle={changeTitle} />
            <TextArea edit={edit} textArea={textArea} changeText={changeText} />
            <HashtagsNote edit={edit} hashtags={hashtags} deleteHashtegs={deleteHashtegs}/>
        </div>
    );
}

export default NoteItem;