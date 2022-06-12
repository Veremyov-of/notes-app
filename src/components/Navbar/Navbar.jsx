import { useContext } from 'react';
import { MainContext } from './../../Context/index';

//components
import FilterSelect from '../FilterSelect/FilterSelect';

//css
import './Navbar.scss';

function Navbar() {
    const {navbar, setNavbar, notes, setNotes, setSelectTag} = useContext(MainContext);
    function createNote() {
        setSelectTag('none');
        setNotes([...notes, {
            hashtags: [],
            id: Date.now(),
            title: 'Empty Note',
            text: 'some text...',
            formHeight: 250,
            hashtagsHeight: 50,
        }]);
    }


    return (
        <div className={navbar ? `navbar navbarActive` : `navbar`}>
            <div className='menu'>
                <button onClick={createNote} className='btn'>
                    Add a Note 
                    <img alt="add" src="./img/icon/add.png"/>
                </button>
                <FilterSelect />
            </div>
            <button onClick={() => setNavbar(!navbar)} className='menuToggle'> 
                <img className={navbar ? `arrow` : `arrowActive`} alt='menuToggle' src="./img/icon/arrow.png" />
            </button>
        </div>
      );
}

export default Navbar;