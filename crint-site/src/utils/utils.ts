import en_dict from '../dictionary/en.json';
import pt_dict from '../dictionary/pt.json';
import { DEFAULT_LANGUAGE } from './appConstants';

export function mountURL(base : string, params : URLSearchParams) {
    let url = base;

    let first : Boolean = true;
    params.forEach((value, param) => {
        // Verifica se é o primeiro parâmetro e ajusta a formatação
        if (first) {
            url += '?';
            first = false;
        }
 
        else
            url += '&';

        url += `${param}=${value}`;
    })
    
    return url;
}

// newParams : [[parâmetro, valor]]
export function updateParams(currentParams : URLSearchParams, newParams : [string, string][]) {
    // Adiciona o parâmetro se ele não existir, se já existir, atualiza ele
    newParams.forEach((pair) => {
        const param = pair[0];
        const value = pair[1];

        if (currentParams.get(param) === null)
            currentParams.append(param, value);
        else
            currentParams.set(param, value);
    })

    return currentParams;
}

// Existem problemas de escalabilidade com o modelo atual, porém, serve para o projeto
export function loadLanguage(currentLang : string) {
    switch (currentLang) {
        case 'pt':
            return pt_dict;

        case 'en':
            return en_dict;
        
        default:
            return pt_dict;
    }
}

// Salva as configurações
export function saveSettings(configSettings : userConfig) {
    localStorage.setItem('settings', JSON.stringify(configSettings));
}

// Carrega as configurações armazenadas
export function loadSettings() {
    let configSettings : userConfig = {lang: DEFAULT_LANGUAGE, fontSizeMod: 1};

    const savedConfigString : string = localStorage.getItem('settings') || '';
    if (savedConfigString === '') 
        return configSettings;

    const savedConfig = JSON.parse(savedConfigString);

    configSettings.lang = savedConfig.lang;
    configSettings.fontSizeMod = savedConfig.fontSizeMod;

    return configSettings;
}