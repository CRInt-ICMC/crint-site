import { Bar, BarChart, Cell, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { useEffect, useState } from 'react';
import { formatDateString, normalizeText, useSettings } from '../utils/utils';
import { readCache, setCache } from '../Caching';
import { ApiDia, ApiPagina } from '../utils/types';
import { useForm, SubmitHandler } from "react-hook-form"
import PageBanner from './PageBanner';
import axios from 'axios';
import PageSection from './PageSection';
import './DIA.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const ProcessData = (CSV: string) => {
    const data: diaData[] = [];

    const lines = CSV.split('\n');
    lines.splice(0, 1); // Remove os títulos
    lines.pop(); // Remove última linha que é vazia

    lines.map((line) => {
        const columns = line.split(',');

        const dataLine: diaData = {
            university: columns[0],
            country: columns[1],
            date: formatDateString(columns[2]),
            comparative: Number(columns[3]) - 5,
            housing: -1,
            food: -1,
            transport: -1,
            totalExpenses: -1,
        }

        if (columns[4] !== 'null' && columns[5] !== 'null' && columns[6] !== 'null') {
            dataLine.housing = Number(columns[4]);
            dataLine.food = Number(columns[5]);
            dataLine.transport = Number(columns[6]);
        }

        data.push(dataLine);
    })

    return data;
}

const CostByUniversity = (data: diaData[], date: string) => {
    const summedData: { [key: string]: diaData } = {};
    const summedNum: { [key: string]: number } = {};

    const formattedDate = new Date('01/08/2012');
    // console.log(formattedDate);

    data.map((line) => {
        const universityData = summedData[line.university];

        if (line.housing > 0 && line.date >= date) {
            // console.log(line.date, date);

            if (universityData && universityData.housing) {
                universityData.housing = line.housing + universityData.housing;
                universityData.food = line.food + universityData.food;
                universityData.transport = line.transport + universityData.transport;
                summedNum[line.university] += 1;
            }

            else {
                summedData[line.university] = line;
                summedNum[line.university] = 1;
            }
        }
    });

    const processedData: diaData[] = Object.values(summedData);

    processedData.map((entry) => {
        entry.housing = Number((entry.housing / summedNum[entry.university]).toFixed(2));
        entry.food = Number((entry.food / summedNum[entry.university]).toFixed(2));
        entry.transport = Number((entry.transport / summedNum[entry.university]).toFixed(2));
        entry.totalExpenses = Number((entry.housing + entry.food + entry.transport).toFixed(2));
    });

    return processedData;
}

const CostByCountry = (data: diaData[], date: string) => {
    const summedData: { [key: string]: diaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const countryData = summedData[line.country];

        if (line.housing > 0) {
            if (countryData && countryData.housing) {
                countryData.housing = line.housing + countryData.housing;
                countryData.food = line.food + countryData.food;
                countryData.transport = line.transport + countryData.transport;
                summedNum[line.country] += 1;
            }

            else {
                summedData[line.country] = line;
                summedNum[line.country] = 1;
            }
        }
    });

    const processedData: diaData[] = Object.values(summedData);

    processedData.map((entry) => {
        entry.housing = Number((entry.housing / summedNum[entry.country]).toFixed(2));
        entry.food = Number((entry.food / summedNum[entry.country]).toFixed(2));
        entry.transport = Number((entry.transport / summedNum[entry.country]).toFixed(2));
        entry.totalExpenses = Number((entry.housing + entry.food + entry.transport).toFixed(2));
    });

    return processedData;
}

const UniversityComparison = (data: diaData[], date: string) => {
    const summedData: { [key: string]: diaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const universityData = summedData[line.university];

        if (universityData && universityData.comparative) {
            universityData.comparative = universityData.comparative;
            summedNum[line.university] += 1;
        }

        else {
            summedData[line.university] = line;
            summedNum[line.university] = 1;
        }
    });

    const correctedData: diaData[] = Object.values(summedData);
    correctedData.map((entry) => {
        const div = (summedNum[entry.university] < 3 ? 3 : summedNum[entry.university]);

        entry.comparative = Number(((entry.comparative || 0) / div).toFixed(2));
    });

    const processedData: diaData[] = [];
    correctedData.map((entry) => {
        if (entry.comparative && entry.comparative !== 0)
            processedData.push(entry);
    });

    return processedData;
}

const CostByUniversityGraph = (data: diaData[], options: OptionsForm) => {
    const processedData: diaData[] = [];

    data.map((entry) => {
        if (entry.totalExpenses <= options.limit && normalizeText(entry.university).includes(normalizeText(options.name)))
            processedData.push(entry);
    })

    processedData.sort((a, b) => (a.totalExpenses - b.totalExpenses) * (options.ascending ? 1 : -1));

    const barWidth = 30;
    const barPadding = 10;
    const minHeight = 600;

    const totalHeight = (processedData.length * (barWidth + barPadding) + 100 > minHeight ? processedData.length * (barWidth + barPadding) + 100 : minHeight);

    return <>
        {
            processedData.length !== 0
                ? <ResponsiveContainer className='dia-chart' width="70%" height={totalHeight} minHeight={minHeight}>
                    <BarChart
                        data={processedData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        style={{ overflow: 'visible' }}
                        layout='vertical'
                    >

                        <XAxis
                            type='number'
                            tick={{ fontSize: 20 }}
                        />
                        <YAxis
                            type='category'
                            dataKey="university"
                            tick={{ fontSize: 14 }}
                            interval={0}
                            width={180}
                        />
                        <Legend wrapperStyle={{ fontSize: "25px" }} />
                        <Tooltip wrapperStyle={{ fontSize: "25px" }} />

                        <Bar type='number' dataKey="transport" name='Transporte' fill="#0A2C57" stackId="a" maxBarSize={barWidth} />
                        <Bar type='number' dataKey="food" name='Alimentação' fill="#00BFBF" stackId="a" maxBarSize={barWidth} />
                        <Bar type='number' dataKey="housing" name='Moradia' fill="#FF8C00" stackId="a" maxBarSize={barWidth} />
                    </BarChart>

                </ResponsiveContainer>
                : <div className='dia-empty' style={{ width: '70%' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} size='4x' color='#0A2C57' />
                    <p>Nenhum item corresponde aos filtros selecionados</p>
                </div>
        }
    </>
}

const CostByCountryGraph = (data: diaData[], options: OptionsForm) => {
    const processedData: diaData[] = []

    data.map((entry) => {
        if (entry.totalExpenses <= options.limit && normalizeText(entry.country).includes(normalizeText(options.name)))
            processedData.push(entry);
    })

    processedData.sort((a, b) => (a.totalExpenses - b.totalExpenses) * (options.ascending ? 1 : -1));

    const barWidth = 40;
    const barPadding = 10;
    const minHeight = 600;

    const totalHeight = (processedData.length * (barWidth + barPadding) + 100 > minHeight ? processedData.length * (barWidth + barPadding) + 100 : minHeight);

    return <>
        {
            processedData.length !== 0
                ? <ResponsiveContainer className='dia-chart' width="70%" height={totalHeight} >
                    <BarChart
                        data={processedData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        style={{ overflow: 'visible' }}
                        layout='vertical'
                    >

                        <XAxis
                            type='number'
                            tick={{ fontSize: 20 }}
                        />
                        <YAxis
                            type='category'
                            dataKey="country"
                            tick={{ fontSize: 20 }}
                            interval={0}
                            width={180}
                        />
                        <Legend wrapperStyle={{ fontSize: "20px" }} />
                        <Tooltip />

                        <Bar type='number' dataKey="transport" name='Transporte' fill="#0A2C57" stackId="a" maxBarSize={barWidth} />
                        <Bar type='number' dataKey="food" name='Alimentação' fill="#00BFBF" stackId="a" maxBarSize={barWidth} />
                        <Bar type='number' dataKey="housing" name='Moradia' fill="#FF8C00" stackId="a" maxBarSize={barWidth} />
                    </BarChart>
                </ResponsiveContainer>
                : <div className='dia-empty' style={{ width: '70%' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} size='4x' color='#0A2C57' />
                    <p>Nenhum item corresponde aos filtros selecionados</p>
                </div>
        }
    </>
}

const UniversityComparisonGraph = (data: diaData[], options: OptionsForm) => {
    const processedData: diaData[] = [];

    data.map((entry) => {
        if (entry.comparative >= options.limit && normalizeText(entry.university).includes(normalizeText(options.name)))
            processedData.push(entry);
    });

    processedData.sort((a, b) => (a.comparative - b.comparative) * (options.ascending ? 1 : -1));

    const barWidth = 40;
    const barPadding = 10;
    const minHeight = 600;

    const totalHeight = (processedData.length * (barWidth + barPadding) + 100 > minHeight ? processedData.length * (barWidth + barPadding) + 100 : minHeight);

    return <>
        {
            processedData.length !== 0
                ? <ResponsiveContainer className='dia-chart' width="80%" height={totalHeight}>
                    <BarChart
                        data={processedData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        style={{ overflow: 'visible' }}
                        layout='vertical'
                    >

                        <XAxis
                            type='number'
                            tick={{ fontSize: 20 }}
                            domain={[-5, 5]}
                            tickCount={11}
                        />
                        <YAxis
                            type='category'
                            dataKey="university"
                            tick={{ fontSize: 14 }}
                            interval={0}
                            width={200}
                        />

                        <ReferenceLine x={0} stroke="#000" />
                        <Tooltip />

                        <Bar type='number' dataKey="comparative" name='Comparativo' stackId='a' maxBarSize={barWidth} >
                            {
                                processedData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.comparative > 0 ? '#BDDDE8' : '#FF0000'} />)
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                : <div className='dia-empty' style={{ width: '80%' }}>
                    <FontAwesomeIcon icon={faQuestionCircle} size='4x' color='#0A2C57' />
                    <p>Nenhum item corresponde aos filtros selecionados</p>
                </div>
        }
    </>;
}

const DIA = () => {
    const { userSettings } = useSettings();

    const [textData, setTextData] = useState<ApiPagina>();
    const [bannerImage, setBannerImage] = useState<string>();
    const [gradient, setGradient] = useState<string>();

    const [dataURL, setDataURL] = useState<string>();
    const [dataCSV, setDataCSV] = useState<string>();
    const [data, setData] = useState<diaData[]>([]);

    const { register: registerUni, handleSubmit: handleSubmitUni, reset: resetUni } = useForm<OptionsForm>();
    const onUniSubmit: SubmitHandler<OptionsForm> = (input) => setCostByUniOptions(input);
    const [CostByUniversityOptions, setCostByUniOptions] = useState<OptionsForm>({ ascending: true, limit: 1000000, name: '', date: '2013-01-01' });

    const { register: registerCt, handleSubmit: handleSubmitCt, reset: resetCt } = useForm<OptionsForm>();
    const onCountrySubmit: SubmitHandler<OptionsForm> = (input) => setCostByCtOptions(input);
    const [CostByCountryOptions, setCostByCtOptions] = useState<OptionsForm>({ ascending: true, limit: 1000000, name: '', date: '2013-01-01' });

    const { register: registerComp, handleSubmit: handleSubmitComp, reset: resetComp } = useForm<OptionsForm>();
    const onComparisonSubmit: SubmitHandler<OptionsForm> = (input) => setUniversityCompOptions(input);
    const [UniversityCompOptions, setUniversityCompOptions] = useState<OptionsForm>({ ascending: true, limit: -5, name: '', date: '2013-01-01' });


    // Recebe o texto e as imagens do Strapi
    useEffect(() => {
        const diaTextCache = readCache('diaText' + userSettings.lang);
        const dataURLCache = readCache('dataURLCache');

        if (diaTextCache) {
            setTextData(diaTextCache as ApiPagina);
            setBannerImage(diaTextCache['attributes']['Banner_imagem']['data']['attributes']['url']);
            setGradient(diaTextCache['attributes']['Gradiente']['data']['attributes']['CSS']);
        }

        else
            axios
                .get(STRAPI_URL + `/api/paginas?filters[URL][$eq]=${location.pathname}&populate=*&locale=` + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'][0];

                    setTextData(data as ApiPagina);
                    setBannerImage(data['attributes']['Banner_imagem']['data']['attributes']['url']);
                    setGradient(data['attributes']['Gradiente']['data']['attributes']['CSS']);

                    setCache('diaText' + userSettings.lang, data);
                });

        if (dataURLCache)
            setDataURL(dataURLCache);

        else
            axios
                .get(STRAPI_URL + `/api/dia?populate=*`, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'] as ApiDia;
                    setDataURL(((data.attributes.Dados as any)['data']['attributes'] as strapiImageFormat).url); // Não é uma imagem, mas só preciso da URL mesmo
                    setCache('dataURLCache', (data.attributes.Dados as any as strapiImageFormat).url);
                });
    }, [userSettings.lang, location]);

    useEffect(() => {
        const dataCache = readCache('dataCache');

        if (dataCache)
            setDataCSV(dataCache);

        else if (dataURL)
            axios
                .get(STRAPI_URL + dataURL, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data'];
                    setDataCSV(data);
                    setCache('dataCache', data);
                });
    }, [dataURL]);

    useEffect(() => {
        if (dataCSV) {
            const processedData = ProcessData(dataCSV);
            setData(processedData);
        }
    }, [dataCSV]);

    const ids: sectionLink[] = [
        { name: 'Gasto mensal em cada universidade', id: 'GastoMedioPorUniversidade' },
        { name: 'Gasto mensal em cada país', id: 'GastoMedioPorPais' },
        { name: 'Comparação de universidades estrangeiras em relação à USP', id: 'ComparacaodeUniversidadesEstrangeirasEmRelacaoAUSP' },
    ]

    const [CostByUniversityData, setCostByUniversityData] = useState<diaData[]>([]);
    const [CostByCountryData, setCostByCountryData] = useState<diaData[]>([]);
    const [UniversityComparisonData, setUniversityCompData] = useState<diaData[]>([]);
    useEffect(() => {
        setCostByUniversityData(CostByUniversity(structuredClone(data), CostByUniversityOptions.date));
    }, [data, CostByUniversityOptions.date]);

    useEffect(() => {
        setCostByCountryData(CostByCountry(structuredClone(data), CostByCountryOptions.date));
    }, [data, CostByCountryOptions.date]);

    useEffect(() => {
        setUniversityCompData(UniversityComparison(structuredClone(data), UniversityCompOptions.date));
    } , [data, UniversityCompOptions.date]);

    return (
        <div className='dia-body'>
            {textData &&
                <PageBanner
                    pageName={String(textData?.attributes.Banner_text)}
                    pageSections={ids}
                    bannerImage={STRAPI_URL + bannerImage}
                    bannerGradient={String(gradient || '')}
                />
            }

            {data &&
                <div>
                    <PageSection
                        id={ids[0].id}
                        title={ids[0].name}
                        body={ 
                            <div className='dia-chart-box'>
                                {CostByUniversityGraph(CostByUniversityData, CostByUniversityOptions)}

                                <div className='dia-options'>
                                    <div className='dia-options-title'>Opções de visualização:</div>

                                    <form className='dia-options-form' autoComplete="off" onSubmit={handleSubmitUni(onUniSubmit)}>
                                        <div className='dia-options-item'>
                                            <input {...registerUni('ascending')} type='checkbox' id='ascending' name='ascending' defaultChecked={true} />
                                            <label htmlFor='ascending'>Ordem crescente</label>
                                        </div>

                                        <div className='dia-options-item'>
                                            <span>Custo Máximo (R$) </span>
                                            <input {...registerUni('limit', { valueAsNumber: true })} type='number' id='limit' name='limit' defaultValue={1000000} min={0} />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='name'>Nome da universidade:</label>
                                            <input {...registerUni('name')} type='text' id='name' name='name' placeholder='Digite aqui...' />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='date'>Data de início:</label>
                                            <input {...registerUni('date')} type='date' id='date' name='date' defaultValue='2013-01-01' min='2013-01-01' />
                                        </div>

                                        <div className='dia-options-buttons'>
                                            <input type='submit' value='Aplicar' name='aplicar' />
                                            <input type='button' name='resetar' value='Resetar' onClick={() => { resetUni(); setCostByUniOptions({ ascending: true, limit: 1000000, name: '', date: '2013-01-01' }) }} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    />

                    <PageSection
                        id={ids[1].id}
                        title={ids[1].name}
                        body={
                            <div className='dia-chart-box'>
                                {CostByCountryGraph(CostByCountryData, CostByCountryOptions)}

                                <div className='dia-options'>
                                    <div className='dia-options-title'>Opções de visualização:</div>

                                    <form className='dia-options-form' autoComplete="off" onSubmit={handleSubmitCt(onCountrySubmit)}>
                                        <div className='dia-options-item'>
                                            <input {...registerCt('ascending')} type='checkbox' id='ascending' name='ascending' defaultChecked={true} />
                                            <label htmlFor='ascending'>Ordem crescente</label>
                                        </div>

                                        <div className='dia-options-item'>
                                            <span>Custo Máximo R$ </span>
                                            <input {...registerCt('limit', { valueAsNumber: true })} type='number' id='limit' name='limit' defaultValue={1000000} min={0} />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='name'>Nome do país:</label>
                                            <input {...registerCt('name')} type='text' id='name' name='name' placeholder='Digite aqui...' />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='date'>Data de início:</label>
                                            <input {...registerCt('date')} type='date' id='date' name='date' defaultValue='2013-01-01' min='2013-01-01' />
                                        </div>

                                        <div className='dia-options-buttons'>
                                            <input type='submit' value='Aplicar' />
                                            <input type="button" onClick={() => { resetCt(); setCostByCtOptions({ ascending: true, limit: 1000000, name: '', date: '2013-01-01' }) }} value="Resetar" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    />

                    <PageSection
                        id={ids[2].id}
                        title={ids[2].name}
                        body={
                            <div className='dia-chart-box'>
                                {UniversityComparisonGraph(UniversityComparisonData, UniversityCompOptions)}

                                <div className='dia-options'>
                                    <div className='dia-options-title'>Opções de visualização:</div>

                                    <form className='dia-options-form' autoComplete="off" onSubmit={handleSubmitComp(onComparisonSubmit)}>
                                        <div className='dia-options-item'>
                                            <input {...registerComp('ascending')} type='checkbox' id='ascending' name='ascending' defaultChecked={true} />
                                            <label htmlFor='ascending'>Ordem crescente</label>
                                        </div>

                                        <div className='dia-options-item' id='short'>
                                            <label htmlFor='min'>Pontuação mínima: </label>
                                            <input {...registerComp('limit', { valueAsNumber: true })} type='number' id='limit' name='limit' defaultValue={-5} min={-5} max={5} />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='name'>Nome da universidade:</label>
                                            <input {...registerComp('name')} type='text' id='name' name='name' placeholder='Digite aqui...' />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='date'>Data de início:</label>
                                            <input {...registerComp('date')} type='date' id='date' name='date' defaultValue='2013-01-01' min='2013-01-01' />
                                        </div>

                                        <div className='dia-options-buttons'>
                                            <input type='submit' value='Aplicar' />
                                            <input type="button" onClick={() => { resetComp(); setUniversityCompOptions({ ascending: true, limit: -5, name: '', date: '2013-01-01' }) }} value="Resetar" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    />
                </div>
            }
        </div>

    );
}

export default DIA;