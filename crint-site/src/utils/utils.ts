// import en_dict from '../dictionary/en.json';
// import pt_dict from '../dictionary/pt.json';
import axios from 'axios';
import { DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES } from './appConstants';
import { Schema } from '@strapi/strapi';
import { ApiHeaderHeader } from './generated/contentTypes';

// Existem problemas de escalabilidade com o modelo atual, porém, serve para o projeto
export async function loadLanguage(currentLang : string, api : string) : Promise<Schema.CollectionType> {
    // Recebe a linguagem e retorna o dicionário associado através da API provida
    if (!AVAILABLE_LANGUAGES.includes(currentLang)) 
        currentLang = DEFAULT_LANGUAGE;

    let response = await axios.get('http://localhost:1337/api' + api);

    return response['data']['data'][0] as Schema.CollectionType;
}

// Salva as configurações
export function saveSettings(configSettings : userConfig) {
    localStorage.setItem('settings', JSON.stringify(configSettings));
}

// Carrega as configurações armazenadas
export function loadSettings() {
    // Configurações padrão
    let configSettings : userConfig = {lang: DEFAULT_LANGUAGE, cookieConsent: false, fontSizeMod: 1};

    // Se não encontra uma configuração salva, retorna a padrão
    const savedConfigString : string = localStorage.getItem('settings') || '';

    // Retorna as configurações padrão caso o cookie não seja encontrado
    if (savedConfigString === '')
        return configSettings;

    // Recupera as informações em JSON e passa para a variável que será retornada
    const savedConfig : userConfig = JSON.parse(savedConfigString);

    configSettings.cookieConsent = savedConfig.cookieConsent;
    configSettings.lang = savedConfig.lang;
    configSettings.fontSizeMod = savedConfig.fontSizeMod;

    return configSettings;
}

// Facilita a atualização do valores de configuração
export function updateUserConfig(currentUserConfig : userConfig, newValues: {lang? : string, cookieConsent?: boolean, fontSizeMod?: number}) {
    let definedLang : string = newValues.lang || currentUserConfig.lang;
    let definedCookieConsent : boolean = newValues.cookieConsent || currentUserConfig.cookieConsent;
    let definedFontSizeMod : number = newValues.fontSizeMod || currentUserConfig.fontSizeMod;
    
    return <userConfig>{lang: definedLang, cookieConsent: definedCookieConsent, fontSizeMod: definedFontSizeMod};
}