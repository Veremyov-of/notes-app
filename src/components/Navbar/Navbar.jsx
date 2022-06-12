import { useContext } from 'react';
import { MainContext } from './../../Context/index';

//components
import FilterSelect from '../FilterSelect/FilterSelect';

//css
import cl from './Navbar.module.css';

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
        <div className={navbar ? `${cl.navbar} ${cl.navbarActive}` : cl.navbar}>
            <div className={cl.menu}>
                <button onClick={createNote} className={cl.btn}>
                    Add a Note 
                    <img alt="add" src="./img/icon/add.png"/>
                </button>
                <FilterSelect />
            </div>
            <button onClick={() => setNavbar(!navbar)} className={cl.menuToggle}> 
                <img className={navbar ? cl.arrow : cl.arrowActive} alt='menuToggle' src="./img/icon/arrow.png" />
            </button>
        </div>
      );
}

export default Navbar;