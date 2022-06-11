import { useState, useContext, useEffect } from 'react';
import cl from './NoteItem.module.css';
import { MainContext } from './../../Context/index';
import HashtagsNote from '../HashtagsNote/HashtagsNote';
import TextArea from '../TextArea/TextArea';
import HeaderNote from './../HeaderNote/HeaderNote';

function NoteItem({ item }) {
    const {notes, setNotes, setGlobalHashtags, globalhashtags} = useContext(MainContext);

    const [noteItem, setNoteItem] = useState({
        id: item.id,
        title: item.title,
        hashtags: item.hashtags,
        text: item.text,
        formHeight: item.formHeight,
        textHeight: item.textHeight,
        textLength: item.textLength,
    });

    const [edit, setEdit] = useState(false);

    const formElem = document.getElementById('form');
    const textElem = document.getElementById('text');

    function handleEdit(stateEdit = edit) {
        setEdit(!stateEdit);
        if(!stateEdit) {
            setNotes(notes.map(item => item.id === noteItem.id ? noteItem : item));
            setGlobalHashtags([...globalhashtags, ...noteItem.hashtags]);
        }
    }

    function changeText(value) {
        setNoteItem({
            ...noteItem,
            text: value,
            hashtags: [... new Set(value.split(' ').filter(item => item[0] === '#'))]
        });
        if(value.length === noteItem.textLength) {
            setNoteItem({...noteItem,
                formHeight: noteItem.formHeight + 100,
                textHeight: noteItem.textHeight + 100,
                textLength: noteItem.textLength + 160,
            });
        }
        adaptiveHeight();
    }

    function adaptiveHeight() {
        formElem.style.height = `${noteItem.formHeight}px`;
        textElem.style.height = `${noteItem.textHeight}px`;
    }

    function changeTitle(value) {
        setNoteItem({...noteItem, title: value});
    }

    useEffect(() => {
        handleEdit(false);
    }, [])
 
    function deleteNote() {
        const index = notes.findIndex(item => item.id === noteItem.id);
        
        for(let i = 0; i < noteItem.hashtags.length; i++) {
            let index = globalhashtags.indexOf(noteItem.hashtags[i]);
            globalhashtags.splice(index, 1);
            setGlobalHashtags([...globalhashtags]);
        }

        notes.splice(index, 1)
        setNotes([...notes]);
    }

    function deleteHashtegs(index) {
        const gIndex = globalhashtags.indexOf(noteItem.hashtags[index]);
        globalhashtags.splice(gIndex, 1);
        setGlobalHashtags([...globalhashtags]);

        const arr = noteItem.text.split(' ').filter(item => noteItem.hashtags[index] !== item);
        setNoteItem({
            ...noteItem,
            text: arr.join(' '),
            hashtags: noteItem.hashtags.filter(item => item !== noteItem.hashtags[index])
        })
    }

    return (
        <div id='form' className={cl.form}>
            <HeaderNote edit={edit} deleteNote={deleteNote} handleEdit={handleEdit} title={noteItem.title} changeTitle={changeTitle} />
            <TextArea edit={edit} textArea={noteItem.text} changeText={changeText} />
            <HashtagsNote edit={edit} hashtags={noteItem.hashtags} deleteHashtegs={deleteHashtegs}/>
        </div>
    );
}

export default NoteItem;