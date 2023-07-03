import icmc_logo from '../img/icmc-logo-completo-p.png';
import '../shared_styles/sections.css';
import './estrangeiros.css'

const Estrangeiros = () => {
    return (
        <div>
            <section className="section-header">
                <div className='section-banner'>
                    <img src={icmc_logo} alt="" />
                    <h1>ESTRANGEIROS</h1>
                </div>
            </section>
        </div>
    );
}

export default Estrangeiros;