//css
import '../../style/styleComponents/HeaderNote/HeaderNote.scss';

function HeaderNote({ edit, deleteNote, handleEdit, title, changeTitle}) {

    const clBtnEdit = edit ? `btnHeader` : `btnHeader btnActive`;

    return ( 
        <div className='wrapp'>
            <input id='test' title="title note" disabled={edit} className='input' onChange={(e) => changeTitle(e.target.value)} value={title} type="text" />
            <button title="edit" type="button" className={clBtnEdit} onClick={() => handleEdit()}>
                <img alt="edit" src={edit ? `./img/icon/edit.png` : `./img/icon/done.png`}/>
            </button>
            <button title='delete note' onClick={deleteNote} type="button" className='btnHeader'>
                <img alt="delete" src="./img/icon/delete.png" />
            </button>
        </div>
     );
}

export default HeaderNote;