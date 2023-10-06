import { useContext, useEffect, useState } from "react";
import { STRAPI_API_TOKEN, STRAPI_URL } from "../utils/appConstants";
import { SettingsContext } from "../Contexto";
import { updateUserSettings } from "../utils/utils";
import { ApiLinguaLingua } from "../utils/generated/contentTypes";
import axios from "axios";
import './LangSystem.scss';

const LangSystem = () => {
    const { userSettings, setUserSettings } = useContext(SettingsContext);
    const [langs, setLangs] = useState<ApiLinguaLingua[]>();

    useEffect(() => {
        axios
            .get(STRAPI_URL + '/api/linguas?populate=*', { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
            .then((response) => {
                let data: ApiLinguaLingua[] = [];

                response['data']['data'].map((lang: ApiLinguaLingua) => {
                    data.push(lang);
                });

                setLangs(data);
            })
    }, []);

    const changeLang = (lang: string) => {
        if (setUserSettings && userSettings) {
            updateUserSettings({ lang: lang });
        }
    }

    return (
        <div className='flags'>
            { // Adiciona bandeiras de todas as linguagens, exceto a linguagem atual
                langs &&
                langs.map((lang) => {
                    const sigla = String(lang.attributes.Sigla);
                    const bandeira = (lang.attributes.Bandeira as any).data.attributes as strapiImageData;

                    if (sigla !== userSettings?.lang) {
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