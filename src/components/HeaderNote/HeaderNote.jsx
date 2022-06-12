//css
import cl from './HeaderNote.module.css';

function HeaderNote({ edit, deleteNote, handleEdit, title, changeTitle}) {

    const clBtnEdit = edit ? cl.btn : `${cl.btn} ${cl.btnActive}`;

    return ( 
        <div className={cl.wrapp}>
            <input id='test' title="title note" disabled={edit} className={cl.input} onChange={(e) => changeTitle(e.target.value)} value={title} type="text" />
            <button title="edit" type="button" className={clBtnEdit} onClick={() => handleEdit()}>
                <img alt="edit" src={edit ? `./img/icon/edit.png` : `./img/icon/done.png`}/>
            </button>
            <button title='delete note' onClick={deleteNote} type="button" className={cl.btn}>
                <img alt="delete" src="./img/icon/delete.png" />
            </button>
        </div>
     );
}

export default HeaderNote;