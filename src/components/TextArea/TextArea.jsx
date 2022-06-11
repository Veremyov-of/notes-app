//css
import cl from './TextArea.module.css';

function TextArea({edit, textArea, changeText}) {

    const arrTextArea = textArea.split(' ');

    return ( 
        <div id="text" className={cl.wrappText}>
            <div className={cl.container}>
                {!edit ? 
                    arrTextArea.map((item, index) => {
                        item = item + ' ';
                        if(item[0] === '#') 
                            return <div key={index} className={cl.hashSpan}>{item}</div>;
                        return item;
                    })
                    :
                    textArea
                }
            </div>
            <textarea disabled={edit} className={cl.textArea} onChange={(e) => changeText(e.target.value)} value={textArea}/>
        </div>
     );
}

export default TextArea;