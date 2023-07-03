import icmc_logo from '../img/icmc-logo-completo-p.png';
import '../shared_styles/sections.css';
import './graduacao.css';

const Graduacao = () => {
    return (
        <div id='graduacao-root' >
            <section className='section-header' >
                <div className="section-banner" >
                    <img src={icmc_logo} alt="" />
                    <h1>GRADUAÇÃO</h1>
                </div>
            </section>
        </div>
    );
}

export default Graduacao;