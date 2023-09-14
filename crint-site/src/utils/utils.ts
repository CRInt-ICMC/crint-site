import { DEFAULT_LANGUAGE } from './appConstants';

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