import { useState } from 'react';

export const useLocalStorage = (localItem) => {
    
    const [loc, setState] = useState(localStorage.getItem(localItem) || []);
    console.log(loc)

    function setLoc(newItem) {
        localStorage.setItem(localItem, newItem);
        setState(newItem);
    }
    return [loc, setLoc];
}
