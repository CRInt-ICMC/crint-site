import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'


const SearchBar = (props : {placeholder? : string, width? : string}) => {
    const placeholderDefault = props.placeholder || 'Digite aqui o que você procura...'
    const widthDefault = props.placeholder || '100%'

    const [inputValue, setInputValue] = useState('');

    const searchInput = () => {
        const location = useLocation();
        const url = location.pathname + location.search;

        const navigate = useNavigate();
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