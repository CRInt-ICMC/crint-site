import TopicBanner from '../../components/TopicBanner';
import TopicSection from '../../components/TopicSection';
import { AZUL_ICMC, BEJE_CLARO, CIANO_USP, LARANJA_USP, MOBILIDADE_GRADIENTE } from '../../utils/appConstants';
import { MOBILIDADE_BANNER } from '../../utils/appImages';
import './aluno.scss'

const AuxiliosFinanceiros = () => (
    <>
        <p>
            A CRInt tem apoiado alunos(as) de graduação e de pós-graduação e pesquisadores(as) de pós-doutorado do ICMC/USP 
            para a participação em eventos internacionais. 
        </p>
        <p>
            A solicitação é em fluxo contínuo e deve ser feita inicialmente 
            para a <a href='https://www.icmc.usp.br/graduacao/informacoes-gerais-e-servicos'>Comissão de Graduação (CG)</a> nos
            casos de alunos(as) de graduação, para a <a href='https://www.icmc.usp.br/pos-graduacao/informacoes-gerais-e-servicos'>
            Comissão de Pós-Graduação (CPG)</a> nos casos de alunos(as) de pós-graduação e para 
            a <a href='https://www.icmc.usp.br/pesquisa/informacoes-gerais-e-servicos'>Comissão de Pesquisa (CPq)</a> nos casos de 
            pesquisadores(as) de pós-doutorado.
        </p>
        <p>
            Após análise de mérito por essas comissões, a solicitação é enviada internamente para 
            a CRInt. Recomenda-se que a solicitação seja feita com pelo menos 60 dias de antecedência do evento.
        </p>
    </>
)

const OportunidadesEditais = () => (
    <>
        <p>
            Ao longo do ano, diversas oportunidades para mobilidade internacional para alunos(as) de graduação e pós-graduação, 
            bolsas para estudos no exterior, cursos de línguas e outros oportunidades no exterior são disponibilizadas.
        </p>
        <p>
            Os(As) alunos(as) podem acompanhar essas oportunidades pelas redes sociais da CRInt (<a href='https://www.instagram.com/icmc.usp/'>
            Instagram</a> e <a href='https://t.me/crinticmc'>Telegram</a>) ou por meio do <a href='https://uspdigital.usp.br/mundus'>
            Sistema Mundus da USP</a>. No Mundus, para alunos(as) de graduação, selecione no menu a opção Editais {'>'} Alunos de Graduação
            {'>'} Editais. Para alunos(as) de pós-graduação, selecione no menu a opção Editais {'>'} Alunos de Pós-Graduação. Ao selecionar 
            o ICMC na unidade de origem do interessado, todos os editais válidos para alunos do ICMC/USP serão listados.
        </p>
        <p>
            Requisitos mínimos exigidos para os alunos(as) de graduação se inscreverem nos editais de vagas de intercâmbio e 
            editais de bolsa:
        </p>
        <ul>
            <li>Média <a href='https://uspdigital.usp.br/mundus/mediaAucaniCalcular?codmnu=9741'>normalizada</a> por turma acima de 5,0;</li>
            <li>Dois semestres já cursados no momento da inscrição (nos editais de vagas de intercâmbio);</li>
            <li>Quatro semestres já cursados no momento da inscrição (nos editais de bolsas); e</li>
            <li>
                Nos casos de reprovações em disciplinas obrigatórias, os(as) alunos(as) devem ter cursado novamente essas disciplinas 
                e sido aprovado em todas elas.
            </li>
        </ul>
    </>
)

const AcordosConvenios = () => (
    <>
        <p>
            Os Convênios de Mobilidade Internacional, os Acordos de Cooperação Internacional e os Protocolo de Intenções 
            Internacionais vigentes podem ser acessados por meio do site da <a href='http://www.usp.br/internationaloffice/'>
            AUCANI da USP</a>. Selecione no menu a opção Convênios {'>'} Instituições Conveniadas. Ao selecionar o ICMC na 
            interveniência, todos os convênios, acordos e protocolos assinados com o ICMC e em vigência são listados. 
        </p>
        <p>
            ​Consulte <a href='https://web.icmc.usp.br/CRINT/Vigentes_reunioes.pdf'>aqui</a> também as instituições no exterior que 
            possuem um Convênio de Mobilidade Internacional onde alunos do ICMC/USP podem realizar intercâmbio.
        </p>
    </>
)

const DocumentosIntercambio = () => (
    <>
        <p><a href='https://web.icmc.usp.br/SCAPINST/docs/plano_de_estudos_ICMC.pdf'>Modelo do plano de estudos para mobilidade internacional de alunos de graduação</a></p>                
        <p><a href='https://web.icmc.usp.br/SCAPINST/docs/carta_motivacao_icmc.pdf'>Modelo da carta de motivação para mobilidade internacional de alunos de graduação</a></p>
        <p><a href='https://web.icmc.usp.br/SCAPINST/docs/recuperacao_de_aprendizado_icmc.pdf'>Modelo do requerimento de recuperação de aprendizado</a></p>
        <p>Relatório de intercâmbio (disponibilizado ao aluno ao final da mobilidade)</p>
    </>
)

const Aluno = () => {
    return (
        <div id='aluno-root'>
            <TopicBanner topicoNome='ALUNOS(AS)' topicoImage={MOBILIDADE_BANNER} style={{background: MOBILIDADE_GRADIENTE}} />
            <TopicSection 
                title='Solicitações de auxílios financeiros' 
                body={AuxiliosFinanceiros()}
                style={{color: 'black', backgroundColor: CIANO_USP}}
                />
            <TopicSection 
                title='Oportunidades no Exterior e Editais em Andamentos' 
                body={OportunidadesEditais()}
                style={{color: 'black', backgroundColor: BEJE_CLARO}}
                />
            <TopicSection 
                title='Acordos e Convênios' 
                body={AcordosConvenios()}
                style={{color: 'white', backgroundColor: AZUL_ICMC}}
                />
            <TopicSection 
                title='Documentos' 
                body={DocumentosIntercambio()}
                style={{color: 'black', backgroundColor: LARANJA_USP}}
                />
        </div>
    );
}

export default Aluno;