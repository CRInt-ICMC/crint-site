import { DEFAULT_LANGUAGE } from './appConstants';

// Salva as configurações
export function saveSettings(configSettings: userSettings) {
    localStorage.setItem('settings', JSON.stringify(configSettings));
}

// Carrega as configurações armazenadas
export function loadSettings() {
    // Configurações padrão
    let configSettings: userSettings = { lang: DEFAULT_LANGUAGE, cookieConsent: false, fontSizeMod: 1 };

    // Se não encontra uma configuração salva, retorna a padrão
    const savedConfigString: string = localStorage.getItem('settings') || '';

    // Retorna as configurações padrão caso o cookie não seja encontrado
    if (savedConfigString === '')
        return configSettings;

    // Recupera as informações em JSON e passa para a variável que será retornada
    const savedConfig: userSettings = JSON.parse(savedConfigString);

    configSettings.cookieConsent = savedConfig.cookieConsent;
    configSettings.lang = savedConfig.lang;
    configSettings.fontSizeMod = savedConfig.fontSizeMod;

    return configSettings;
}

// Facilita a atualização do valores de configuração
export function updateUserSettings(currentUserSettings: userSettings, newValues: { lang?: string, cookieConsent?: boolean, fontSizeMod?: number }) {
    let definedLang: string = newValues.lang || currentUserSettings.lang;
    let definedCookieConsent: boolean = newValues.cookieConsent || currentUserSettings.cookieConsent;
    let definedFontSizeMod: number = newValues.fontSizeMod || currentUserSettings.fontSizeMod;

    return <userSettings>{ lang: definedLang, cookieConsent: definedCookieConsent, fontSizeMod: definedFontSizeMod };
}