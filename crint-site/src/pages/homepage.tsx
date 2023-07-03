import SearchBar from '../components/SearchBar';
import './homepage.css'
import { ICMC_BACKGROUND } from '../utils/appImages';

const Homepage = () => {
    return (
        <div className='homepage-body'>
            <section className='main-section' style={{backgroundImage: `url(${ICMC_BACKGROUND})`}}>
                <span className='searchbar-container' style={{width: '70%'}}><SearchBar /></span>
            </section>
            <h1>CRInt</h1>
        </div>
    )
}

export default Homepage;