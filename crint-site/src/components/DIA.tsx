import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './DIA.scss'
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import PageBanner from './PageBanner';
import { useEffect, useState } from 'react';
import { useSettings } from '../utils/utils';
import { readCache, setCache } from '../Caching';
import axios from 'axios';
import { ApiDia, ApiPagina } from '../utils/types';

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
            Comparativo: columns[5],
            GastoMedio: -1,
        }

        if (columns[6] !== 'null')
            dataLine.GastoMedio = Number(columns[6]);

        data.push(dataLine);
    })

    return data;
}

const SumByUniversity = (data: diaData[], crescente: number) => {
    const summedData: { [key: string]: diaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const universityData = summedData[line.Universidade]

        if (line.GastoMedio > 0) {
            if (universityData && universityData.GastoMedio) {
                universityData.GastoMedio = line.GastoMedio + universityData.GastoMedio;
                summedNum[line.Universidade] += 1;
            }

            else {
                summedData[line.Universidade] = line;
                summedNum[line.Universidade] = 1;
            }
        }
    })

    let finalData: diaData[] = Object.values(summedData);
    finalData.map((entry) => {
        entry.GastoMedio = Number(((entry.GastoMedio || 0) / summedNum[entry.Universidade]).toFixed(2));
    })

    finalData = finalData.sort((a, b) => (b.GastoMedio - a.GastoMedio) * crescente);

    return finalData;
}

const SumByCountry = (data: diaData[], crescente: number) => {
    const summedData: { [key: string]: diaData } = {};
    const summedNum: { [key: string]: number } = {};

    data.map((line) => {
        const countryData = summedData[line.Pais]

        if (line.GastoMedio > 0) {
            if (countryData && countryData.GastoMedio) {
                countryData.GastoMedio = line.GastoMedio + countryData.GastoMedio;
                summedNum[line.Pais] += 1;
            }

            else {
                summedData[line.Pais] = line;
                summedNum[line.Pais] = 1;
            }
        }
    })

    let finalData: diaData[] = Object.values(summedData);
    finalData.map((entry) => {
        entry.GastoMedio = Number(((entry.GastoMedio || 0) / summedNum[entry.Pais]).toFixed(2));
    })

    finalData = finalData.sort((a, b) => (b.GastoMedio - a.GastoMedio) * crescente);

    return finalData;
}

const DIA = () => {
    const { userSettings } = useSettings();
    const [textData, setTextData] = useState<ApiPagina>();
    const [bannerImage, setBannerImage] = useState<string>();
    const [gradient, setGradient] = useState<string>();
    const [dataURL, setDataURL] = useState<string>();
    const [dataCSV, setDataCSV] = useState<string>();
    const [data, setData] = useState<diaData[]>();

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
                    // console.log(data);
                });
    }, [dataURL])

    useEffect(() => {
        if (dataCSV) {
            const processedData = ProcessData(dataCSV);
            setData(processedData);
        }
    }, [dataCSV])

    return (
        <div className='dia-body'>
            <PageBanner
                pageName={String(textData?.attributes.Banner_text)}
                pageSections={[]}
                bannerImage={STRAPI_URL + bannerImage}
                bannerGradient={String(gradient || '')}
            />

            {data &&
                <div className='dia-chart' style={{ paddingTop: '100px' }}>
                    <h1>Gasto mensal em cada universidade</h1>
                    <ResponsiveContainer width="100%" maxHeight={window.innerHeight * 3} aspect={1.0 / 1.0}>
                        <BarChart
                            data={SumByUniversity(data, 1)}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            style={{ overflow: 'visible' }}
                            layout='vertical'
                        >

                            <XAxis type='number' />
                            <YAxis
                                type='category'
                                dataKey="Universidade"
                                tick={{ fontSize: 20 }}
                                interval={0}
                                width={180}
                            />
                            <Legend />
                            <Tooltip />

                            <Bar type='number' dataKey="GastoMedio" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>

                    <h1>Gasto mensal em cada país</h1>
                    <ResponsiveContainer width="100%" maxHeight={window.innerHeight * 3} aspect={1.0 / 1.0}>
                        <BarChart
                            data={SumByCountry(data, 1)}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            style={{ overflow: 'visible' }}
                            layout='vertical'
                        >

                            <XAxis type='number' />
                            <YAxis
                                type='category'
                                dataKey="Pais"
                                tick={{ fontSize: 20 }}
                                interval={0}
                                width={180}
                            />
                            <Legend />
                            <Tooltip />

                            <Bar type='number' dataKey="GastoMedio" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }
        </div>

    );
}

export default DIA;