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

import { useEffect, useState } from "react";
import { DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from "../utils/constants";
import { updateUserSettings, useSettings } from "../utils/utils";
import { ApiLang } from "../utils/types";
import Select from 'react-select';
import axios from "axios";
import './LangSystem.scss';

interface LangIcon {
    value: string,
    label: any,
    icon: string,
}

const LangSystem = () => {
    const context = useSettings();
    const { userSettings } = context;
    
    const [options, setOptions] = useState<LangIcon[]>([]);
    const [selectedLang, setSelectedLang] = useState<LangIcon>();

    // Recebe as opções de linguagem do sistema e as bandeiras associadas
    useEffect(() => {
        axios
            .get(STRAPI_URL + '/api/linguas?populate=*', { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
            .then((response) => {
                const data: ApiLang[] = [];

                response['data']['data'].map((lang: ApiLang) => {
                    data.push(lang);
                });

                // Caso a linguagem do usuário não exista, define a linguagem padrão
                if (data.filter((lang) => String(lang.attributes.Sigla) === userSettings.lang).length === 0)
                    updateUserSettings(context, { lang: DEFAULT_LANGUAGE });

                const optionsData = data.map((lang) => {
                    const sigla = String(lang.attributes.Sigla);
                    const bandeira = (lang.attributes.Bandeira as any).data.attributes as StrapiImageData;

                    return {
                        value: sigla,
                        label: <img src={STRAPI_URL + bandeira.url} className='icon'></img>,
                        icon: STRAPI_URL + bandeira.url,
                    } as LangIcon;
                });

                setOptions(optionsData);
            })
    }, []);

    // Altera a linguagem que aparece na seleção
    useEffect(() => {
        setSelectedLang(options.find((option) => option.value === userSettings.lang));
    }, [options]);

    const changeLang = (lang: string) => {
        updateUserSettings(context, { lang: lang });
        setSelectedLang(options.find((option) => option.value === lang));
    };

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            background: 'transparent',
            fontsize: '14px',
            color: 'white',
            border: 0,
            margin: 0,
            cursor: 'pointer',
            textAlign: 'center',
            
            '&:hover': {
                border: 0,
                boxShadow: 'none',
            }
        }),

        // @ts-expect-error - Necessário, pois o pacote não possui tipagem para essas propriedades
        option: (styles: any, { isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            };
        },
    };

    return (
        <div className='flags'>
            { // Adiciona bandeiras de todas as linguagens, exceto a linguagem atualmente selecionada
                selectedLang &&
                <Select
                    defaultValue={selectedLang}
                    className='select-lang'
                    options={options.filter((option) => option.value !== selectedLang.value)}
                    styles={selectStyles}
                    onChange={e => changeLang(e ? e.value : DEFAULT_LANGUAGE)}
                    isSearchable={false}
                />
            }
        </div>
    );
}

export default LangSystem;