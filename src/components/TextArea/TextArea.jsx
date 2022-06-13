//css
import '../../style/styleComponents/TextArea/TextArea.scss';

function TextArea({ edit, textArea, changeText}) {

    const arrTextArea = textArea.split(' ');

    return ( 
        <div className='wrappText'>
            <div className='container'>
                {!edit ? 
                    arrTextArea.map((item, index) => {
                        item = item + ' ';
                        if(item[0] === '#') 
                            return <div key={index} className='hashSpan'>{item}</div>;
                        return item;
                    })
                    :
                    textArea
                }
            </div>
            <textarea disabled={edit} className='textArea' onChange={(e) => changeText(e.target.value)} value={textArea}/>
        </div>
     );
}

export default TextArea;