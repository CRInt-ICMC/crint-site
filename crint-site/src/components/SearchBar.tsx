import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'
import { mountURL, updateParams } from '../utils/utils';


const SearchBar = (props : {placeholder? : string, width? : string}) => {
    const placeholderDefault = props.placeholder || 'Digite aqui o que você procura...'
    const widthDefault = props.placeholder || '100%'

    const location = useLocation();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    function searchInput() {
        let parameters = new URLSearchParams(location.search);

        // Adiciona o parâmetro se ele não existir, se já existir, atualiza ele
        updateParams(parameters, [['search', inputValue]]);
        // if (parameters.get('search') === null)
        //     parameters.append('search', inputValue);
        // else
        //     parameters.set('search', inputValue);

        const url = mountURL(location.pathname, parameters);
        navigate(url);
    }
    

    return (
        <div className='searchbar-root' style={{width: `${widthDefault}`}}>
            <input type="text" name="searchbar" placeholder={`${placeholderDefault}`} onChange={(event) => {setInputValue(event.target.value)}} />
            <button onClick={() => {searchInput()}}><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: 'black'}} /></button>
        </div>
    );
}

export default SearchBar;