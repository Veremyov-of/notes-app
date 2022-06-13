import { useContext } from 'react';
import { MainContext } from './../../Context/index';

//css
import '../../style/styleComponents/FilterSelect/FilterSelect.scss';

function FilterSelect() {
    
    const { globalhashtags, selectTag, setSelectTag } = useContext(MainContext);

    function changeSelectTag() {
        return (e) => setSelectTag(e.target.value);
    }

    return ( 
        <select className='filterSelect' onChange={changeSelectTag()} value={selectTag}>
            {globalhashtags.map((item, index) => {
                return <option className='hashOption' value={item} key={index}>{item}</option>
            })}
        </select>
     );
}

export default FilterSelect;