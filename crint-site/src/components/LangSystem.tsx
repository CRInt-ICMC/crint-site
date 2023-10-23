import { useEffect, useState } from "react";
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from "../utils/constants";
import { updateUserSettings, useSettings } from "../utils/utils";
import axios from "axios";
import './LangSystem.scss';
import { ApiLingua } from "../utils/types";

const LangSystem = () => {
    const context = useSettings();
    const { userSettings } = context;
    const [langs, setLangs] = useState<ApiLingua[]>();

    useEffect(() => {
        axios
            .get(STRAPI_URL + '/api/linguas?populate=*', { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
            .then((response) => {
                let data: ApiLingua[] = [];

                response['data']['data'].map((lang: ApiLingua) => {
                    data.push(lang);
                });

                setLangs(data);
            })
    }, []);

    const changeLang = (lang: string) => {
        let newLang = lang;

        // Previne que uma opção de linguagem não existente seja inserida no sistema
        if (!AVAILABLE_LANGUAGES.includes(newLang))
            newLang = DEFAULT_LANGUAGE;

        updateUserSettings(context, { lang: newLang })
    };

    return (
        <div className='flags'>
            { // Adiciona bandeiras de todas as linguagens, exceto a linguagem atual
                langs &&
                langs.map((lang) => {
                    const sigla = String(lang.attributes.Sigla);
                    const bandeira = (lang.attributes.Bandeira as any).data.attributes as strapiImageData;

                    if (sigla !== userSettings.lang) {
                        return (
                            <button key={sigla} onClick={() => changeLang(sigla)}>
                                <img alt={bandeira.caption} src={STRAPI_URL + bandeira.url} />
                            </button>
                        );
                    }
                })
            }
        </div>
    );
}

export default LangSystem;