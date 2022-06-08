import cl from './Navbar.module.css';
import { useState } from 'react';

function Navbar() {

    const [navbar, setNavbar] = useState(true);

    return (
        <div className={navbar ? cl.navbar + ' ' + cl.navbarActive : cl.navbar}>
            <div className={cl.menu}>
                <button className={cl.btn}>Add a Note <img alt="add" src="./img/icon/add.png"/></button>
            </div>
            <button onClick={() => setNavbar(!navbar)} className={cl.menuToggle}><img alt='menuToggle' src="./img/icon/arrow.png" /></button>
        </div>
      );
}

export default Navbar;