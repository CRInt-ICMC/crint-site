import { useEffect, useState } from "react";
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from "../utils/constants";
import { updateUserSettings, useSettings } from "../utils/utils";
import { ApiLingua } from "../utils/types";
import Select from 'react-select';
import axios from "axios";
import './LangSystem.scss';

const LangSystem = () => {
    const context = useSettings();
    const { userSettings } = context;
    const [options, setOptions] = useState<langIcon[]>([]);
    const [selectedLang, setSelectedLang] = useState<langIcon>();

    useEffect(() => {
        axios
            .get(STRAPI_URL + '/api/linguas?populate=*', { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
            .then((response) => {
                const data: ApiLingua[] = [];

                response['data']['data'].map((lang: ApiLingua) => {
                    data.push(lang);
                });

                const optionsData = data.map((lang) => {
                    const sigla = String(lang.attributes.Sigla);
                    const bandeira = (lang.attributes.Bandeira as any).data.attributes as strapiImageData;
            
                    return {
                        value: sigla,
                        label: <img src={STRAPI_URL + bandeira.url} height='30px' width='45px'></img>,
                        icon: STRAPI_URL + bandeira.url,
                    } as langIcon;
                });

                setOptions(optionsData);
            })
    }, []);

    useEffect(() => {
        setSelectedLang(options.find((option) => option.value === userSettings.lang));
    }, [options]);

    const changeLang = (lang: string) => {
        let newLang = lang;

        // Previne que uma opção de linguagem não existente seja inserida no sistema
        if (!AVAILABLE_LANGUAGES.includes(newLang))
            newLang = DEFAULT_LANGUAGE;

        updateUserSettings(context, { lang: newLang })
        setSelectedLang(options?.find((option) => option.value === newLang));
    };

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            border: 0,
            background: 'transparent',
            boxShadow: 'none',
            fontsize: '14px',
            margin: 0,

            '&:hover': {
                border: 0,
                boxShadow: 'none',
            }
        }),
    };

    return (
        <div className='flags'>
            { // Adiciona bandeiras de todas as linguagens, exceto a linguagem atual
                selectedLang &&
                    <Select defaultValue={selectedLang} options={options} styles={selectStyles} onChange={(e) => changeLang(e ? e.value : DEFAULT_LANGUAGE)} />
            }
        </div>
    );
}

export default LangSystem;