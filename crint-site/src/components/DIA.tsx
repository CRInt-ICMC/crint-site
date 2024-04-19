// This file is part of CRInt-site.

// CRInt-site is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CRInt-site is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CRInt-site. If not, see <https://www.gnu.org/licenses/>.

import { Bar, BarChart, Cell, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { useEffect, useState } from 'react';
import { cleanText, formatDateString, getLinks, normalizeText, useLoading, useSettings } from '../utils/utils';
import { readCache, setCache } from '../Caching';
import { ApiDia, ApiPage, ApiSection } from '../utils/types';
import { useForm, SubmitHandler } from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Interweave } from 'interweave';
import { useNavigate } from 'react-router-dom';
import PageBanner from './PageBanner';
import axios from 'axios';
import PageSection from './PageSection';
import './DIA.scss'
import { Grid } from '@mui/material';

// Informações para a formação dos gráficos
interface DiaData {
    university: string,
    country: string,
    date: string,
    comparative: number,
    housing: number,
    food: number,
    transport: number,
    totalExpenses: number,
}

// Opções de visualização dos gráficos
interface OptionsForm {
    ascending: boolean,
    limit: number,
    name: string,
    date: string,
}

const processData = (CSV: string) => {
    const data: DiaData[] = [];

    const lines = CSV.split('\n');
    lines.splice(0, 1); // Remove os títulos
    lines.pop(); // Remove última linha que é vazia

    // Mapeia cada coluna para um atributo
    lines.map((line) => {
        const columns = line.split(',');

        const dataLine: DiaData = {
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

const processCostUniversity = (data: DiaData[], date: string) => {
    const summedData: { [key: string]: DiaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const universityData = summedData[line.university];

        if (line.housing > 0 && line.date >= date) {
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

    const processedData: DiaData[] = Object.values(summedData);

    processedData.map((entry) => {
        entry.housing = Number((entry.housing / summedNum[entry.university]).toFixed(2));
        entry.food = Number((entry.food / summedNum[entry.university]).toFixed(2));
        entry.transport = Number((entry.transport / summedNum[entry.university]).toFixed(2));
        entry.totalExpenses = Number((entry.housing + entry.food + entry.transport).toFixed(2));
    });

    return processedData;
}

const processCostCountry = (data: DiaData[], date: string) => {
    const summedData: { [key: string]: DiaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const countryData = summedData[line.country];

        if (line.housing > 0 && line.date >= date) {
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

    const processedData: DiaData[] = Object.values(summedData);

    processedData.map((entry) => {
        entry.housing = Number((entry.housing / summedNum[entry.country]).toFixed(2));
        entry.food = Number((entry.food / summedNum[entry.country]).toFixed(2));
        entry.transport = Number((entry.transport / summedNum[entry.country]).toFixed(2));
        entry.totalExpenses = Number((entry.housing + entry.food + entry.transport).toFixed(2));
    });

    return processedData;
}

const processComparisonData = (data: DiaData[], date: string) => {
    const summedData: { [key: string]: DiaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const universityData = summedData[line.university];

        if (line.date >= date) {
            if (universityData && universityData.comparative) {
                universityData.comparative = universityData.comparative;
                summedNum[line.university] += 1;
            }

            else {
                summedData[line.university] = line;
                summedNum[line.university] = 1;
            }
        }
    });

    const processedData: DiaData[] = [];
    Object.values(summedData).map((entry) => {
        const div = (summedNum[entry.university] < 3 ? 3 : summedNum[entry.university]);

        if (entry.comparative && entry.comparative !== 0) {
            entry.comparative = Number(((entry.comparative || 0) / div).toFixed(2));
            processedData.push(entry);
        }
    });

    return processedData;
}

const plotCostUniversity = (data: DiaData[], options: OptionsForm) => {
    const processedData: DiaData[] = [];

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

const plotCostCountry = (data: DiaData[], options: OptionsForm) => {
    const processedData: DiaData[] = []

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

const plotComparison = (data: DiaData[], options: OptionsForm) => {
    const processedData: DiaData[] = [];

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
                            { // Pinta as barras de acordo com o valor
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
    const { addLoadingCoins, subLoadingCoins } = useLoading();
    const navigate = useNavigate();

    // Por padrão, os gráficos mostram apenas os dados dos últimos 5 anos
    const defaultDate = `${new Date().getFullYear() - 5}-01-01`;

    /* Estados dos formulários de cada gráfico */
    // Universidades
    const [universityOptions, setUniversityOptions] = useState<OptionsForm>({ ascending: true, limit: 1000000, name: '', date: defaultDate });
    const { register: registerUniversity, handleSubmit: handleSubmitUniversity, reset: resetUniversityForm } = useForm<OptionsForm>();
    const onUniversitySubmit: SubmitHandler<OptionsForm> = (input) => setUniversityOptions(input);

    // Países
    const [countryOptions, setCountryOptions] = useState<OptionsForm>({ ascending: true, limit: 1000000, name: '', date: defaultDate });
    const { register: registerCountry, handleSubmit: handleSubmitCountry, reset: resetCountryForm } = useForm<OptionsForm>();
    const onCountrySubmit: SubmitHandler<OptionsForm> = (input) => setCountryOptions(input);

    // Comparação
    const [comparisonOptions, setComparisonOptions] = useState<OptionsForm>({ ascending: true, limit: -5, name: '', date: defaultDate });
    const { register: registerComparison, handleSubmit: handleSubmitComparison, reset: resetComparisonForm } = useForm<OptionsForm>();
    const onComparisonSubmit: SubmitHandler<OptionsForm> = (input) => setComparisonOptions(input);

    /* Estados com os dados do Strapi */
    const [textData, setTextData] = useState<ApiPage>();
    const [bannerImage, setBannerImage] = useState<string>();
    const [gradient, setGradient] = useState<string>();
    const [sections, setSections] = useState<ApiSection[]>();

    const [dataUrl, setDataUrl] = useState<string>();
    const [data, setData] = useState<DiaData[]>([]);

    // Recebe o texto e as imagens do Strapi
    useEffect(() => {
        const cacheDiaText = readCache('DiaText' + userSettings.lang);
        const cacheDataUrl = readCache('cacheDataUrl');

        if (cacheDiaText) {
            setTextData(cacheDiaText as ApiPage);
            setBannerImage(cacheDiaText['attributes']['Banner_imagem']['data']['attributes']['url']);
            setGradient(cacheDiaText['attributes']['Gradiente']['data']['attributes']['CSS']);
            setSections(cacheDiaText['attributes']['secoes']['data']);
        }

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + `/api/paginas?filters[URL][$eq]=${location.pathname}&populate=*&locale=` + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'][0];

                    if (data === undefined) {
                        navigate('/');
                        subLoadingCoins();
                        return;
                    }

                    setTextData(data as ApiPage);
                    setBannerImage(data['attributes']['Banner_imagem']['data']['attributes']['url']);
                    setGradient(data['attributes']['Gradiente']['data']['attributes']['CSS']);
                    setSections(data['attributes']['secoes']['data']);

                    setCache('DiaText' + userSettings.lang, data);
                    subLoadingCoins();
                });
        }

        if (cacheDataUrl)
            setDataUrl(cacheDataUrl);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + `/api/dia?populate=*`, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    // Não é uma imagem, mas só preciso da URL mesmo
                    const url = (((response['data']['data'] as ApiDia).attributes.Dados as any)['data']['attributes'] as StrapiImageData).url;
                    setDataUrl(url);

                    setCache('cacheDataUrl', url);
                    subLoadingCoins();
                });
        }
    }, [userSettings.lang, location]);

    // Recebe os dados do CSV, processa e salva no estado
    useEffect(() => {
        const dataCache = readCache('dataCache');

        if (dataCache)
            setData(dataCache);

        else if (dataUrl) {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + dataUrl, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = processData(response['data']);
                    setData(data);

                    setCache('dataCache', data);
                    subLoadingCoins();
                });
        }
    }, [dataUrl]);

    /* Reprocessa os dados de acordo com a data de corte selecionada */
    const [costPerUniversity, setCostUniversity] = useState<DiaData[]>([]);
    useEffect(() => {
        setCostUniversity(processCostUniversity(structuredClone(data), universityOptions.date));
    }, [data, universityOptions.date]);

    const [costCountryData, setCostCountry] = useState<DiaData[]>([]);
    useEffect(() => {
        setCostCountry(processCostCountry(structuredClone(data), countryOptions.date));
    }, [data, countryOptions.date]);

    const [comparisonData, setComparisonData] = useState<DiaData[]>([]);
    useEffect(() => {
        setComparisonData(processComparisonData(structuredClone(data), comparisonOptions.date));
    }, [data, comparisonOptions.date]);

    return (
        <div className='dia-body'>
            {textData &&
                <PageBanner
                    pageName={String(textData?.attributes.Banner_text)}
                    pageSections={getLinks(sections || [])}
                    bannerImage={STRAPI_URL + bannerImage}
                    bannerGradient={String(gradient || '')}
                />
            }

            {data &&
                <div>
                    {/* GRÁFICO DE CUSTO POR UNIVERSIDADE */}
                    {sections && sections[0] &&
                        <PageSection
                            id={'0-' + cleanText(String(sections[0].attributes.Titulo))}
                            title={String(sections[0].attributes.Titulo)}
                            body={
                                <>
                                    <Interweave content={String(sections[0].attributes.Corpo)} allowElements />

                                    <Grid container className='dia-chart-box'>
                                        <Grid md={9}>
                                            {costPerUniversity.length > 0 && plotCostUniversity(costPerUniversity, universityOptions)}
                                        </Grid>

                                        <Grid md={3} className='dia-options'>
                                            <div className='dia-options-title'>Opções de visualização:</div>

                                            <form className='dia-options-form' autoComplete="off" onSubmit={handleSubmitUniversity(onUniversitySubmit)}>
                                                <div className='dia-options-item'>
                                                    <input {...registerUniversity('ascending')} type='checkbox' id='ascending' name='ascending' defaultChecked={true} />
                                                    <label htmlFor='ascending'>Ordem crescente</label>
                                                </div>

                                                <div className='dia-options-item'>
                                                    <label htmlFor='limit'>Custo Máximo (R$): </label>
                                                    <input {...registerUniversity('limit', { valueAsNumber: true })} type='number' id='limit' name='limit' defaultValue={1000000} min={0} />
                                                </div>

                                                <div className='dia-options-item'>
                                                    <label htmlFor='name'>Nome da universidade:</label>
                                                    <input {...registerUniversity('name')} type='text' id='name' name='name' placeholder='Digite aqui...' />
                                                </div>

                                                <div className='dia-options-item'>
                                                    <label htmlFor='date'>Dados a partir de:</label>
                                                    <input {...registerUniversity('date')} type='date' id='date' name='date' defaultValue={defaultDate} min='2018-01-01' />
                                                </div>

                                                <div className='dia-options-buttons'>
                                                    <input type='submit' value='Aplicar' name='aplicar' />
                                                    <input type='button' name='resetar' value='Resetar' onClick={() => { resetUniversityForm(); setUniversityOptions({ ascending: true, limit: 1000000, name: '', date: defaultDate }) }} />
                                                </div>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        />
                    }

                    {/* GRÁFICO DE CUSTO POR PAÍS */}
                    {sections && sections[1] &&
                        <PageSection
                            id={'1-' + cleanText(String(sections[1].attributes.Titulo))}
                            title={String(sections[1].attributes.Titulo)}
                            body={
                                <>
                                    {sections && sections[1] && <Interweave content={String(sections[1].attributes.Corpo)} allowElements />}

                                    <Grid container className='dia-chart-box'>
                                        <Grid md={9}>
                                            {costCountryData.length > 0 && plotCostCountry(costCountryData, countryOptions)}
                                        </Grid>

                                        <Grid md={3} className='dia-options'>
                                            <div className='dia-options-title'>Opções de visualização:</div>

                                            <form className='dia-options-form' autoComplete="off" onSubmit={handleSubmitCountry(onCountrySubmit)}>
                                                <div className='dia-options-item'>
                                                    <input {...registerCountry('ascending')} type='checkbox' id='ascending' name='ascending' defaultChecked={true} />
                                                    <label htmlFor='ascending'>Ordem crescente</label>
                                                </div>

                                                <div className='dia-options-item'>
                                                    <label htmlFor='limit'>Custo Máximo (R$): </label>
                                                    <input {...registerCountry('limit', { valueAsNumber: true })} type='number' id='limit' name='limit' defaultValue={1000000} min={0} />
                                                </div>

                                                <div className='dia-options-item'>
                                                    <label htmlFor='name'>Nome do país:</label>
                                                    <input {...registerCountry('name')} type='text' id='name' name='name' placeholder='Digite aqui...' />
                                                </div>

                                                <div className='dia-options-item'>
                                                    <label htmlFor='date'>Dados a partir de: </label>
                                                    <input {...registerCountry('date')} type='date' id='date' name='date' defaultValue={defaultDate} min='2018-01-01' />
                                                </div>

                                                <div className='dia-options-buttons'>
                                                    <input type='submit' value='Aplicar' />
                                                    <input type="button" onClick={() => { resetCountryForm(); setCountryOptions({ ascending: true, limit: 1000000, name: '', date: defaultDate }) }} value="Resetar" />
                                                </div>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        />
                    }

                    {/* GRÁFICO DE COMPARAÇÃO DE UNIVERSIDADES */}
                    {sections && sections[2] &&
                        <PageSection
                            id={'2-' + cleanText(String(sections[2].attributes.Titulo))}
                            title={String(sections[2].attributes.Titulo)}
                            body={
                                <>
                                    {sections && sections[2] && <Interweave content={String(sections[2].attributes.Corpo)} allowElements />}

                                    <Grid container className='dia-chart-box'>
                                        <Grid md={9}>
                                            {comparisonData.length > 0 && plotComparison(comparisonData, comparisonOptions)}
                                        </Grid>

                                        <Grid md={3} className='dia-options'>
                                            <div className='dia-options-title'>Opções de visualização:</div>

                                            <form className='dia-options-form' autoComplete="off" onSubmit={handleSubmitComparison(onComparisonSubmit)}>
                                                <div className='dia-options-item'>
                                                    <input {...registerComparison('ascending')} type='checkbox' id='ascending' name='ascending' defaultChecked={true} />
                                                    <label htmlFor='ascending'>Ordem crescente</label>
                                                </div>

                                                <div className='dia-options-item' id='short'>
                                                    <label htmlFor='min'>Pontuação mínima: </label>
                                                    <input {...registerComparison('limit', { valueAsNumber: true })} type='number' id='limit' name='limit' defaultValue={-5} min={-5} max={5} />
                                                </div>

                                                <div className='dia-options-item'>
                                                    <label htmlFor='name'>Nome da universidade:</label>
                                                    <input {...registerComparison('name')} type='text' id='name' name='name' placeholder='Digite aqui...' />
                                                </div>

                                                <div className='dia-options-item'>
                                                    <label htmlFor='date'>Dados a partir de:</label>
                                                    <input {...registerComparison('date')} type='date' id='date' name='date' defaultValue={defaultDate} min='2013-01-01' />
                                                </div>

                                                <div className='dia-options-buttons'>
                                                    <input type='submit' value='Aplicar' />
                                                    <input type="button" onClick={() => { resetComparisonForm(); setComparisonOptions({ ascending: true, limit: -5, name: '', date: defaultDate }) }} value="Resetar" />
                                                </div>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        />
                    }
                </div>
            }
        </div>
    );
}

export default DIA;