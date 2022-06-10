import cl from './Navbar.module.css';
import { useContext } from 'react';
import { MainContext } from './../../Context/index';

function Navbar() {
    const {navbar, setNavbar, notes, setNotes} = useContext(MainContext);

    function createNote() {
        setNotes([...notes, {id: Date.now()}]);
    }

    return (
        <div className={navbar ? `${cl.navbar} ${cl.navbarActive}` : cl.navbar}>
            <div className={cl.menu}>
                <button onClick={createNote} className={cl.btn}>
                    Add a Note 
                    <img alt="add" src="./img/icon/add.png"/>
                </button>
            </div>
            <button onClick={() => setNavbar(!navbar)} className={cl.menuToggle}> 
                <img className={navbar ? cl.arrow : cl.arrowActive} alt='menuToggle' src="./img/icon/arrow.png" />
            </button>
        </div>
      );
}

export default Navbar;