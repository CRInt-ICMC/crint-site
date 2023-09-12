import TopicBanner from '../componentes/TopicBanner';
import TopicSection from '../componentes/TopicSection';
import { BEJE_CLARO, INFORMACOES_GRADIENTE } from '../utils/appConstants';
import { INFORMACOES_BANNER } from '../utils/appImages';

const AcordosConvenios = () => {
    return (
        <>
            <p>
                Os Convênios de Mobilidade Internacional, os Acordos de Cooperação Internacional e os Protocolo de Intenções Internacionais 
                vigentes podem ser acessados por meio do site da <a href='http://www.usp.br/internationaloffice/'> AUCANI da USP</a>. 
                Selecione no menu a opção Convênios {'>'} Instituições Conveniadas. Ao selecionar o ICMC na interveniência, todos os convênios, 
                acordos e protocolos que envolvem de alguma forma o ICMC/USP e em vigência são listados. 
            </p>

            <h3>Passos para o Estabelecimento de Acordos e Convênios</h3>
            <p>
                As principais etapas para o estabelecimento de Convênios de Mobilidade Internacional, Acordos de Cooperação Internacional e 
                Protocolo de Intenções Internacionais são:
            </p>
            
            <ol>
                <li>
                    A USP disponibiliza <a href='https://uspdigital.usp.br/mundus/conveniosinternacionaismodelos?codmnu=2058'>templates</a> dos 
                    documentos para Convênios de Mobilidade Internacional, Acordos de Cooperação Internacional e Protocolos de Intenções 
                    Internacionais nas três principais línguas (inglês, português e espanhol);
                </li>
                <li>
                    Após as negociações iniciais feitas pelos(as) docentes interessados(as), o Serviço de Bolsas e Convênios do ICMC/USP envia o 
                    documento para o setor equivalente na instituição do exterior;
                </li>
                <li>O documento tramita nas diversas instâncias do ICMC/USP.</li>
                <li>O documento é analisado nas instâncias superiores da USP.</li>
                <li>Estando em conformidade, o documento é enviado para a instituição do exterior para as assinaturas.</li>
                <li>Finalmente, o documento é assinado pelo dirigente do ICMC/USP.</li>
            </ol>
        </>
    );
}

const OportunidadesExterior = () => (
    <>
        <p>
            Ao longo do ano, diversas oportunidades para mobilidade internacional para docentes, chamadas de projeto, bolsas no exterior, 
            cursos de línguas e outras oportunidades no exterior são disponibilizadas. 
        </p>
        <p>
            Os docentes podem acompanhar as oportunidades no exterior e editais em andamento pelas redes sociais da CRInt 
            (<a href='https://www.instagram.com/icmc.usp/'>Instagram</a> e <a href='https://t.me/crinticmc'>Telegram</a>) ou por meio do <a href='https://uspdigital.usp.br/mundus'> Sistema Mundus da USP</a>. 
            No Mundus, selecione no menu a opção Editais {'>'} Docentes. Ao selecionar o ICMC na unidade de origem do interessado, 
            todos os editais válidos para docentes do ICMC/USP serão listados.
        </p>
    </>
)

const Informacoes = () => {
    return (
        <div id='informacoes-root'>
            <TopicBanner 
                topicoNome='INFORMAÇÕES' 
                topicoImage={INFORMACOES_BANNER} 
                style={{background: INFORMACOES_GRADIENTE}} 
                />
            <TopicSection 
                title='Acordos e Convênios' 
                body={AcordosConvenios()} 
                style={{backgroundColor: BEJE_CLARO}}
                /> 
            <TopicSection 
                title='Oportunidades no Exterior e Editais em Andamento' 
                body={OportunidadesExterior()} 
                style={{backgroundColor: BEJE_CLARO}}
                />
        </div>
    );
}

export default Informacoes;