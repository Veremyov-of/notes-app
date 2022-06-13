//css
import '../../style/styleComponents/HashtagsNote/HashtagsNote.scss';

function HashtagsNote({ edit, hashtags, deleteHashtegs, id }) {

    const titleCheck = edit ? 'to delete it, click edit' : 'delete hashteg';

    return ( 
        <div id={id + 1} className='hashtags'>
                {hashtags.map((item, index) => (
                    <div
                        title={titleCheck}
                        onClick={edit ? null : () => deleteHashtegs(index)}
                        className={edit ? 'itemHashtagActive' : 'itemHashtag'} 
                        key={index}
                    >
                        {item}
                    </div>
                ))}
        </div>
     );
}

export default HashtagsNote;