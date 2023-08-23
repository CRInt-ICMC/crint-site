import en_dict from '../dictionary/en.json';
import pt_dict from '../dictionary/pt.json';
import { DEFAULT_LANGUAGE } from './appConstants';

// Existem problemas de escalabilidade com o modelo atual, porém, serve para o projeto
export function loadLanguage(currentLang : string) {
    // Recebe a linguagem e retorna o JSON associado
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
    // Configurações padrão
    let configSettings : userConfig = {lang: DEFAULT_LANGUAGE, firstVisit: true, fontSizeMod: 1};

    // Se não encontra uma configuração salva, retorna a padrão
    const savedConfigString : string = localStorage.getItem('settings') || '';

    // Retorna as configurações padrão caso o cookie não seja encontrado
    if (savedConfigString === '')
        return configSettings;

    // Recupera as informações em JSON e passa para a variável que será retornada
    const savedConfig = JSON.parse(savedConfigString);

    configSettings.lang = savedConfig.lang;
    configSettings.fontSizeMod = savedConfig.fontSizeMod;

    return configSettings;
}

// Facilita a atualização do valores de configuração
export function updateUserConfig(currentUserConfig : userConfig, newValues: {lang? : string, firstVisit?: boolean, fontSizeMod?: number}) {
    let definedLang : string = newValues.lang || currentUserConfig.lang;
    let definedFirstVisit : boolean = newValues.firstVisit || currentUserConfig.firstVisit;
    let definedFontSizeMod : number = newValues.fontSizeMod || currentUserConfig.fontSizeMod;
    
    return <userConfig>{lang: definedLang, firstVisit: definedFirstVisit, fontSizeMod: definedFontSizeMod};
}