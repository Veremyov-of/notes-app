import cl from './Navbar.module.css';
import { useContext } from 'react';
import { MainContext } from './../../Context/index';

function Navbar() {
    const {navbar, setNavbar, notes, setNotes, globalhashtags, selectTag, setSelectTag} = useContext(MainContext);
    function createNote() {
        setNotes([...notes, {
            hashtags: [],
            id: Date.now(),
            title: 'Empty Note',
            text: 'some text...',
            formHeight: 250,
            textHeight: 150,
            textLength: 160,
        }]);
    }


    return (
        <div className={navbar ? `${cl.navbar} ${cl.navbarActive}` : cl.navbar}>
            <div className={cl.menu}>
                <button onClick={createNote} className={cl.btn}>
                    Add a Note 
                    <img alt="add" src="./img/icon/add.png"/>
                </button>
                <select className={cl.filterSelect} onChange={(e) => setSelectTag(e.target.value)} value={selectTag}>
                    {[...new Set(globalhashtags)].map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                    })}
                </select>
            </div>
            <button onClick={() => setNavbar(!navbar)} className={cl.menuToggle}> 
                <img className={navbar ? cl.arrow : cl.arrowActive} alt='menuToggle' src="./img/icon/arrow.png" />
            </button>
        </div>
      );
}

export default Navbar;