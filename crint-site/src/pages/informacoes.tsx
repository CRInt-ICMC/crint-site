import TopicBanner from '../components/TopicBanner';
import './informacoes.css'
import TopicSection from '../components/TopicSection';

const InfoDoc = () => {
    return (
        <>
            <h3>Auxílios Financeiros</h3>
            <p>A CRInt tem apoiado os docentes para a participação em eventos internacionais ou outros eventos pertinentes à internalização. 
                A solicitação é em fluxo contínuo e deve ser feita diretamente à 
                <a href='https://www.icmc.usp.br/pesquisa/informacoes-gerais-e-servicos'>Comissão de Pesquisa (CPq)</a>. 
                Após análise de mérito por essa comissão, a solicitação é enviada internamente para a CRInt. Recomenda-se que a solicitação 
                seja feita com pelo menos 60 dias de antecedência do evento.
            </p>

            <h3>Oportunidades no Exterior e Editais em Andamento</h3>
            <p>
                Ao longo do ano, diversas oportunidades para mobilidade internacional para docentes, chamadas de projeto, bolsas no exterior, 
                cursos de línguas e outras oportunidades no exterior são disponibilizadas. 
            </p>
            <p>
                Os docentes podem acompanhar as oportunidades no exterior e editais em andamento pelas redes sociais da CRInt 
                (<a href='https://www.instagram.com/icmc.usp/'> Instagram</a> e <a href='https://t.me/crinticmc'>Telegram</a>) ou por meio do 
                <a href='https://uspdigital.usp.br/mundus'> Sistema Mundus da USP</a>. No Mundus, selecione no menu a opção Editais {'>'} 
                Docentes. Ao selecionar o ICMC na unidade de origem do interessado, todos os editais válidos para docentes do ICMC/USP serão listados.
            </p>

            <h3>Acordos e Convênios</h3>
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
                    A USP disponibiliza <a href='https://uspdigital.usp.br/mundus/conveniosinternacionaismodelos?codmnu=2058'>templates</a> 
                    dos documentos para Convênios de Mobilidade Internacional, Acordos de Cooperação Internacional e Protocolos de Intenções 
                    Internacionais nas três principais línguas (inglês, português e espanhol);
                </li>
                <li>
                    Após as negociações iniciais feitas pelos docentes interessados, o Serviço de Bolsas e Convênios do ICMC/USP envia o 
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

const Informacoes = () => {
    return (
        <div id='informacoes-root'>
            <TopicBanner topicoNome='INFORMAÇÕES' />
            <TopicSection 
                title='Informações para Docentes sobre Mobilidade Internacional' 
                body={InfoDoc()} 
                /> 
        </div>
    );
}

export default Informacoes;