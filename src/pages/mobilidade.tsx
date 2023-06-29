import icmc_logo from '../img/icmc-logo-completo-p.png';
import '../shared_styles/sections.css';
import './mobilidade.css';

const Mobilidade = () => {
    return (
        <div id="mobilidade-root">
            <section className="section-header">
                <div className='section-banner'>
                    <img src={icmc_logo} alt="" />
                    <h1>MOBILIDADE USP</h1>
                </div>
            </section>
        </div>
    );
}

export default Mobilidade;