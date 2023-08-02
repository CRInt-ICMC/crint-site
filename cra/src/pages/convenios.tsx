import icmc_logo from '../img/icmc-logo-completo-p.png';
import '../shared_styles/sections.css';
import './convenios.css'

const Convenios = () => {
    return (
        <div>
            <section className="section-header">
                <div className='section-banner'>
                    <img src={icmc_logo} alt="" />
                    <h1>CONVÊNIOS</h1>
                </div>
            </section>
        </div>
    );
}

export default Convenios;