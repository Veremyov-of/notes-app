//css
import cl from './HashtagsNote.module.css';

function HashtagsNote({ edit, hashtags, deleteHashtegs, id }) {

    const titleCheck = edit ? 'to delete it, click edit' : 'delete hashteg';

    return ( 
        <div id={id + 1} className={cl.hashtags}>
                {hashtags.map((item, index) => (
                    <div
                        title={titleCheck}
                        onClick={edit ? null : () => deleteHashtegs(index)}
                        className={edit ? cl.itemHashtagActive : cl.itemHashtag} 
                        key={index}
                    >
                        {item}
                    </div>
                ))}
        </div>
     );
}

export default HashtagsNote;