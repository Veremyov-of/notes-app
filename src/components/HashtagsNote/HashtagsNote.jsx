//css
import cl from './HashtagsNote.module.css';

function HashtagsNote({ edit, hashtags, deleteHashtegs }) {

    const titleCheck = edit ? 'to delete it, click edit' : 'delete hashteg';

    return ( 
        <div className={cl.hashtags}>
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