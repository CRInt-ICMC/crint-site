import { Bar, BarChart, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { useEffect, useState } from 'react';
import { sortDIAData, useSettings } from '../utils/utils';
import { readCache, setCache } from '../Caching';
import { ApiDia, ApiPagina } from '../utils/types';
import { useForm, SubmitHandler } from "react-hook-form"
import PageBanner from './PageBanner';
import axios from 'axios';
import PageSection from './PageSection';
import './DIA.scss'

const ProcessData = (CSV: string) => {
    const data: diaData[] = [];

    const lines = CSV.split('\n');
    lines.splice(0, 1); // Remove os títulos
    lines.pop(); // Remove última linha que é vazia

    lines.map((line) => {
        const columns = line.split(',');

        const dataLine: diaData = {
            CursoICMC: columns[0],
            Universidade: columns[1],
            Pais: columns[2],
            Inicio: columns[3],
            Termino: columns[4],
            Comparativo: Number(columns[5]),
            Moradia: -1,
            Alimentacao: -1,
            Transporte: -1,
            Soma: -1,
        }

        if (columns[6] !== 'null') {
            dataLine.Moradia = Number(columns[6]);
            dataLine.Alimentacao = Number(columns[7]);
            dataLine.Transporte = Number(columns[8]);
        }

        data.push(dataLine);
    })

    return data;
}

const CostByUniversityGraph = (data: diaData[], options: OptionsForm) => {
    const processedData: diaData[] = [];

    data.map((entry) => {
        if (entry.Soma >= options.min && entry.Soma <= options.max)
            processedData.push(entry);
    })

    const sortedData = sortDIAData(processedData, 'cost', options.ascending);

    return (
        <ResponsiveContainer width="70%">
            <BarChart
                data={sortedData}
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
                    dataKey="Universidade"
                    tick={{ fontSize: 14 }}
                    interval={0}
                    width={180}
                />
                <Legend wrapperStyle={{ fontSize: "25px" }} />
                <Tooltip wrapperStyle={{ fontSize: "25px" }} />

                <Bar type='number' dataKey="Transporte" fill="#0A2C57" stackId="a" />
                <Bar type='number' dataKey="Alimentacao" fill="#00BFBF" stackId="a" />
                <Bar type='number' dataKey="Moradia" fill="#FF8C00" stackId="a" />
            </BarChart>

        </ResponsiveContainer>
    );
}

const CostByCountryGraph = (data: diaData[], options: OptionsForm) => {
    const processedData: diaData[] = []

    data.map((entry) => {
        if (entry.Soma >= options.min && entry.Soma <= options.max)
            processedData.push(entry);
    })

    console.log('country', options)

    const sortedData: diaData[] = sortDIAData(processedData, 'cost', options.ascending);

    return (
        <ResponsiveContainer width="70%" >
            <BarChart
                data={sortedData}
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
                    dataKey="Pais"
                    tick={{ fontSize: 20 }}
                    interval={0}
                    width={180}
                />
                <Legend wrapperStyle={{ fontSize: "20px" }} />
                <Tooltip />

                <Bar type='number' dataKey="Transporte" fill="#0A2C57" stackId="a" />
                <Bar type='number' dataKey="Alimentacao" fill="#00BFBF" stackId="a" />
                <Bar type='number' dataKey="Moradia" fill="#FF8C00" stackId="a" />
            </BarChart>
        </ResponsiveContainer>
    );
}

// const UniversityComparisonGraph = (data: diaData[], ascending: boolean) => {
//     const summedData: { [key: string]: diaData } = {};
//     const summedNum: { [key: string]: number } = {};

//     data.map((line) => {
//         const universityData = summedData[line.Universidade]

//         if (universityData && universityData.Comparativo) {
//             universityData.Comparativo = (line.Comparativo - 5) + universityData.Comparativo;
//             summedNum[line.Universidade] += 1;
//         }

//         else {
//             summedData[line.Universidade] = line;
//             summedNum[line.Universidade] = 1;
//         }
//     })

//     const processedData: diaData[] = Object.values(summedData);
//     processedData.map((entry) => {
//         entry.Comparativo = ((entry.Comparativo || 0) / summedNum[entry.Universidade]);
//     })

//     const sortedData: diaData[] = sortDIAData(processedData, 'comparative', ascending);

//     return (
//         <div className='dia-chart'>
//             <ResponsiveContainer width="80%" aspect={1.0 / 5.0}>
//                 <BarChart
//                     data={sortedData}
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                     style={{ overflow: 'visible' }}
//                     layout='vertical'
//                 >

//                     <XAxis
//                         type='number'
//                         tick={{ fontSize: 20 }}
//                     />
//                     <YAxis
//                         type='category'
//                         dataKey="Universidade"
//                         tick={{ fontSize: 11 }}
//                         interval={0}
//                         width={180}
//                     />
//                     <Legend wrapperStyle={{ fontSize: "20px" }} />
//                     <ReferenceLine x={0} stroke="#000" />
//                     <Tooltip />

//                     <Bar type='number' dataKey="Comparativo" fill="#FF8C00" stackId="a" />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }

const CostByUniversity = (data: diaData[]) => {
    const summedData: { [key: string]: diaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const universityData = summedData[line.Universidade];

        if (line.Moradia > 0) {
            if (universityData && universityData.Moradia) {
                universityData.Moradia = line.Moradia + universityData.Moradia;
                universityData.Alimentacao = line.Alimentacao + universityData.Alimentacao;
                universityData.Transporte = line.Transporte + universityData.Transporte;
                summedNum[line.Universidade] += 1;
            }

            else {
                summedData[line.Universidade] = line;
                summedNum[line.Universidade] = 1;
            }
        }
    });

    const processedData: diaData[] = Object.values(summedData);

    processedData.map((entry) => {
        entry.Moradia = Number((entry.Moradia / summedNum[entry.Universidade]).toFixed(2));
        entry.Alimentacao = Number((entry.Alimentacao / summedNum[entry.Universidade]).toFixed(2));
        entry.Transporte = Number((entry.Transporte / summedNum[entry.Universidade]).toFixed(2));
        entry.Soma = Number((entry.Moradia + entry.Alimentacao + entry.Transporte).toFixed(2));
    });

    return processedData;
}

const CostByCountry = (data: diaData[]) => {
    const summedData: { [key: string]: diaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const countryData = summedData[line.Pais];

        if (line.Moradia > 0) {
            if (countryData && countryData.Moradia) {
                countryData.Moradia = line.Moradia + countryData.Moradia;
                countryData.Alimentacao = line.Alimentacao + countryData.Alimentacao;
                countryData.Transporte = line.Transporte + countryData.Transporte;
                summedNum[line.Pais] += 1;
            }

            else {
                summedData[line.Pais] = line;
                summedNum[line.Pais] = 1;
            }
        }
    });

    const processedData: diaData[] = Object.values(summedData);

    processedData.map((entry) => {
        entry.Moradia = Number((entry.Moradia / summedNum[entry.Pais]).toFixed(2));
        entry.Alimentacao = Number((entry.Alimentacao / summedNum[entry.Pais]).toFixed(2));
        entry.Transporte = Number((entry.Transporte / summedNum[entry.Pais]).toFixed(2));
        entry.Soma = Number((entry.Moradia + entry.Alimentacao + entry.Transporte).toFixed(2));
    });

    return processedData;
}

const UniversityComparison = (data: diaData[]) => {
    const summedData: { [key: string]: diaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const universityData = summedData[line.Universidade];

        if (universityData && universityData.Comparativo) {
            universityData.Comparativo = (line.Comparativo - 5) + universityData.Comparativo;
            summedNum[line.Universidade] += 1;
        }

        else {
            summedData[line.Universidade] = line;
            summedNum[line.Universidade] = 1;
        }
    });

    const processedData: diaData[] = Object.values(summedData);
    processedData.map((entry) => {
        entry.Comparativo = ((entry.Comparativo || 0) / summedNum[entry.Universidade]);
    });

    return processedData;
}

const DIA = () => {
    const { userSettings } = useSettings();
    const [textData, setTextData] = useState<ApiPagina>();
    const [bannerImage, setBannerImage] = useState<string>();
    const [gradient, setGradient] = useState<string>();
    const [dataURL, setDataURL] = useState<string>();
    const [dataCSV, setDataCSV] = useState<string>();
    const [data, setData] = useState<diaData[]>([]);

    const { register: registerUni, handleSubmit: handleSubmitUni } = useForm<OptionsForm>();
    const { register: registerCt, handleSubmit: handleSubmitCt } = useForm<OptionsForm>();
    const onUniversitySubmit: SubmitHandler<OptionsForm> = (input) => setCostByUniversityOptions(input);
    const [CostByUniversityOptions, setCostByUniversityOptions] = useState<OptionsForm>({ ascending: true, min: 0, max: 1000000 });

    const onCountrySubmit: SubmitHandler<OptionsForm> = (input) => setCostByCountryOptions(input);
    const [CostByCountryOptions, setCostByCountryOptions] = useState<OptionsForm>({ ascending: true, min: 0, max: 1000000 });

    const onComparisonSubmit: SubmitHandler<OptionsForm> = (input) => setUniversityComparisonOptions(input);
    const [UniversityComparisonOptions, setUniversityComparisonOptions] = useState<OptionsForm>({ ascending: true, min: -100, max: 100 });


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
    }, [dataURL])

    useEffect(() => {
        if (dataCSV) {
            const processedData = ProcessData(dataCSV);
            setData(processedData);
        }
    }, [dataCSV])

    const ids: sectionLink[] = [
        { name: 'Gasto mensal em cada universidade', id: 'GastoMedioPorUniversidade' },
        { name: 'Gasto mensal em cada país', id: 'GastoMedioPorPais' },
        { name: 'Comparação de universidades estrangeiras em relação à USP', id: 'ComparacaodeuniversidadesestrangeirasemrelacaoaUSP' },
    ]


    const [CostByUniversityData, setCostByUniversityData] = useState<diaData[]>([]);
    const [CostByCountryData, setCostByCountryData] = useState<diaData[]>([]);
    // const [UniversityComparisonData, setUniversityComparisonData] = useState<diaData[]>([]);
    useEffect(() => {
        setCostByUniversityData(CostByUniversity(structuredClone(data)));
        setCostByCountryData(CostByCountry(structuredClone(data)));
        // setUniversityComparisonData(UniversityComparison(data));

    }, [data])

    console.log(CostByUniversityOptions);

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
                            <div className='dia-chart'>
                                {CostByUniversityGraph(CostByUniversityData, CostByUniversityOptions)}

                                <div className='dia-options'>
                                    <div className='dia-options-title'>Opções de visualização:</div>

                                    <form className='dia-options-form' onSubmit={handleSubmitUni(onUniversitySubmit)}>
                                        <div className='dia-options-item'>
                                            <label htmlFor='ascending'>Ordem crescente:</label>
                                            <input
                                                {...registerUni('ascending')}
                                                type='checkbox' id='ascending' name='ascending' defaultChecked={true}
                                            />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='min'>Custo mínimo:</label>
                                            <input {...registerUni('min', { valueAsNumber: true })} type='number' id='min' name='min' defaultValue={0} min={0} />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='max'>Custo máximo:</label>
                                            <input {...registerUni('max', { valueAsNumber: true })} type='number' id='max' name='max' defaultValue={1000000} min={0} />
                                        </div>

                                        <input type='submit' value='Aplicar' />
                                    </form>



                                </div>
                            </div>

                        }
                    />

                    <PageSection
                        id={ids[1].id}
                        title={ids[1].name}
                        body={
                            <div className='dia-chart'>
                                {CostByCountryGraph(CostByCountryData, CostByCountryOptions)}

                                <div className='dia-options'>
                                    <div className='dia-options-title'>Opções de visualização:</div>

                                    <form className='dia-options-form' onSubmit={handleSubmitCt(onCountrySubmit)}>
                                        <div className='dia-options-item'>
                                            <label htmlFor='ascending'>Ordem crescente:</label>
                                            <input {...registerCt('ascending')} type='checkbox' id='ascending' name='ascending' defaultChecked={true} />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='min'>Custo mínimo:</label>
                                            <input {...registerCt('min', { valueAsNumber: true })} type='number' id='min' name='min' defaultValue={0} min={0} />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='max'>Custo máximo:</label>
                                            <input {...registerCt('max', { valueAsNumber: true })} type='number' id='max' name='max' defaultValue={1000000} min={0} />
                                        </div>

                                        <input type='submit' value='Aplicar' />
                                    </form>
                                </div>
                            </div>
                        }
                    />

                    <PageSection
                        id={ids[2].id}
                        title={ids[2].name}
                        body={
                            <div className='dia-chart'>
                                {/* {UniversityComparisonGraph(UniversityComparisonData)} */}

                                <div className='dia-options'>
                                    <form className='dia-options-form' onSubmit={handleSubmitCt(onCountrySubmit)}>
                                        <div className='dia-options-item'>
                                            <label htmlFor='ascending'>Ordem crescente:</label>
                                            <input {...registerCt('ascending')} type='checkbox' id='ascending' name='ascending' defaultChecked={true} />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='min'>Custo mínimo:</label>
                                            <input {...registerCt('min', { valueAsNumber: true })} type='number' id='min' name='min' defaultValue={0} min={0} />
                                        </div>

                                        <div className='dia-options-item'>
                                            <label htmlFor='max'>Custo máximo:</label>
                                            <input {...registerCt('max', { valueAsNumber: true })} type='number' id='max' name='max' defaultValue={1000000} min={0} />
                                        </div>

                                        <input type='submit' value='Aplicar' />
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