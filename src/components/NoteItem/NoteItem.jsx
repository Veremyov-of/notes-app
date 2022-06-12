import { useState, useContext, useEffect } from 'react';
import { MainContext } from './../../Context/index';

//components
import HashtagsNote from '../HashtagsNote/HashtagsNote';
import TextArea from '../TextArea/TextArea';
import HeaderNote from './../HeaderNote/HeaderNote';

//css
import './NoteItem.scss';

function NoteItem({ note }) {
    const { notes, setNotes } = useContext(MainContext);
    
    const [edit, setEdit] = useState(false);

    const [noteItem, setNoteItem] = useState(note);

    useEffect(() => {
        handleEdit();
    }, [])
    
    function adaptiveHeight() {
        const formElem = document.getElementById(noteItem.id);
        formElem.style.height = `${noteItem.formHeight}px`;

        const hashtagsHeight = document.getElementById(`${noteItem.id + 1}`);
        if(hashtagsHeight.style) hashtagsHeight.style.height = `${noteItem.hashtagsHeight}px`;
        
    }

    function handleEdit() {
        adaptiveHeight();
        setEdit(!edit);
        setNotes(notes.map(note => note.id === noteItem.id ? noteItem : note));
    }


    function changeText(value) {
        setNoteItem({
            ...noteItem,
            text: value,
            hashtags: onlyInstancesTags(value),
            formHeight: calcHeightForm(value),
            hashtagsHeight: calcHeightHeshtags(noteItem.hashtags.join(' ')),
        });
        adaptiveHeight();
    }
    
    const onlyInstancesTags = (value) => [...new Set(value.split(' ').filter(item => item[0] === '#'))];

    const calcHeightForm = (value) => value.length >= 160 ? 250 + (Math.floor(value.length / 160) * 100) : 250;
    const calcHeightHeshtags = (value) => value.length >= 30 ? 50 + (Math.floor(value.length / 30) * 30) : 50;

    const changeTitle = (value) => setNoteItem({...noteItem, title: value});
    
    function deleteNote() {
        const index = notes.findIndex(note => note.id === noteItem.id);
        notes.splice(index, 1)
        setNotes([...notes]);
    }

    function deleteHashtegs(index) {
        const arrText = noteItem.text.split(' ').filter(item => item !== noteItem.hashtags[index]);
        setNoteItem({
            ...noteItem,
            text: arrText.join(' '),
            hashtags: noteItem.hashtags.filter(hashtag => hashtag !== noteItem.hashtags[index])
        })
    }
    

    return (
         <div className='formWrapp'>
            <div id={noteItem.id} className='form'>
                <HeaderNote edit={edit} deleteNote={deleteNote} handleEdit={handleEdit} title={noteItem.title} changeTitle={changeTitle} />
                <TextArea edit={edit} textArea={noteItem.text} changeText={changeText} />
            </div>
            <HashtagsNote id={noteItem.id} edit={edit} hashtags={noteItem.hashtags} deleteHashtegs={deleteHashtegs}/>
         </div>
    );
}

export default NoteItem;