import { useState, useContext, useEffect } from 'react';
import { MainContext } from './../../Context/index';

//components
import HashtagsNote from '../HashtagsNote/HashtagsNote';
import TextArea from '../TextArea/TextArea';
import HeaderNote from './../HeaderNote/HeaderNote';

//css
import cl from './NoteItem.module.css';

function NoteItem({ item }) {
    const {notes, setNotes, setGlobalHashtags, globalhashtags} = useContext(MainContext);
    
    const [noteItem, setNoteItem] = useState({
        id: item.id,
        title: item.title,
        hashtags: item.hashtags,
        text: item.text,
        formHeight: item.formHeight,
    });
    
    function adaptiveHeight() {
        const formElem = document.getElementById(noteItem.id);
        formElem.style.height = `${noteItem.formHeight}px`;
    }

    const [edit, setEdit] = useState(false);

    function handleEdit(stateEdit = edit) {
        adaptiveHeight();
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
            hashtags: onlyInstancesTags(),
            formHeight: calcHeight(value),
        });
        adaptiveHeight();
    }
    
    const onlyInstancesTags = () => [...new Set(value.split(' ').filter(item => item[0] === '#'))];

    const calcHeight = (value) => value.length >= 160 ? 250 + (Math.floor(value.length / 160) * 100) : 250;


    const changeTitle = (value) => setNoteItem({...noteItem, title: value});

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

        const arrText = noteItem.text.split(' ').filter(item => item !== noteItem.hashtags[index]);
        setNoteItem({
            ...noteItem,
            text: arrText.join(' '),
            hashtags: noteItem.hashtags.filter(item => item !== noteItem.hashtags[index])
        })
    }

    return (
        <div id={noteItem.id} className={cl.form}>
            <HeaderNote edit={edit} deleteNote={deleteNote} handleEdit={handleEdit} title={noteItem.title} changeTitle={changeTitle} />
            <TextArea edit={edit} textArea={noteItem.text} changeText={changeText} />
            <HashtagsNote edit={edit} hashtags={noteItem.hashtags} deleteHashtegs={deleteHashtegs}/>
        </div>
    );
}

export default NoteItem;