import { useState } from 'react';

export const useLocalStorage = (localItem) => {
    
    const [loc, setState] = useState(localStorage.getItem(localItem) || []);

    function setLoc(newItem) {
        localStorage.setItem(localItem, JSON.stringify(newItem));
        setState(newItem);
    }
    return [loc, setLoc];
}
