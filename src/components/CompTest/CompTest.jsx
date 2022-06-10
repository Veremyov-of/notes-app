import cl from './CompTest.module.css';
import { useState, useRef } from 'react';

function CompTest() {

    const [text, setText] = useState('');




    return ( 
        <div className={cl.container}>
            <div className={cl.wrapp}>
                <div className={cl.contentEditable}>
                    {text.split(' ').map(item => {
                        item = item + ' ';
                        if(item[0] === '#') 
                            return <div className={cl.hashSpan}>{item}</div>;
                        return item;
                    })}
                </div>
                <textarea id="input" className={cl.textarea} onChange={(e) => setText(e.target.value)} value={text} />
            </div>
        </div>
     );
}


export default CompTest;