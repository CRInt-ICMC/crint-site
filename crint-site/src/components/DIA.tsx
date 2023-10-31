import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
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

        const dataLine : diaData = {
            CursoICMC: columns[0],
            Universidade: columns[1],
            Pais: columns[2],
            Inicio: columns[3],
            Termino: columns[4],
            Comparativo: columns[5],
        }

        if (columns[6] !== 'null')
            dataLine.GastoMedio = Number(columns[6]);

        data.push(dataLine);
    })

    return data;
}

const DIA = () => {
    const { userSettings } = useSettings();
    const [textData, setTextData] = useState<ApiPagina>();
    const [bannerImage, setBannerImage] = useState<string>();
    const [gradient, setGradient] = useState<string>();
    const [dataURL, setDataURL] = useState<string>();
    const [dataCSV, setDataCSV] = useState<string>();
    const [data, setData] = useState<diaData[]>();

    // const data = [
    //     { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    //     { name: 'Page B', uv: 300, pv: 2400, amt: 2400 },
    //     { name: 'Page C', uv: 200, pv: 2400, amt: 2400 },
    //     { name: 'Page D', uv: 100, pv: 2400, amt: 2400 },
    //     { name: 'Page E', uv: 20, pv: 2400, amt: 2400 },
    // ];

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
        if (dataCSV)
            setData(ProcessData(dataCSV));
    }, [dataCSV])

    console.log(data)

    return (
        <div className='dia-body'>
            <PageBanner
                pageName={String(textData?.attributes.Banner_text)}
                pageSections={[]}
                bannerImage={STRAPI_URL + bannerImage}
                bannerGradient={String(gradient || '')}
            />

            <div className='dia-section'>
                <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="GastoMedio" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        </div>

    );
}

export default DIA;