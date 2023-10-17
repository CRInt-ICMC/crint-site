import React from 'react';
import { SettingsContext } from '../Context';
import { DEFAULT_LANGUAGE } from './appConstants';

// Carrega as configurações armazenadas
export function loadSettings() {
    // Configurações padrão
    let userSettings: userSettings = { lang: DEFAULT_LANGUAGE, cookieConsent: false, fontSizeMod: 1 };

    // Se não encontra uma configuração salva, retorna a padrão
    const savedConfigString: string = localStorage.getItem('settings') || '';

    // Retorna as configurações padrão caso o cookie não seja encontrado
    if (savedConfigString === '')
        return userSettings;

    // Recupera as informações em JSON e passa para a variável que será retornada
    const savedConfig: userSettings = JSON.parse(savedConfigString);

    userSettings.cookieConsent = savedConfig.cookieConsent;
    userSettings.lang = savedConfig.lang;
    userSettings.fontSizeMod = savedConfig.fontSizeMod;

    return userSettings;
}

// Facilita a atualização do valores de configuração
export const updateUserSettings = (context: initializedSettings, newValues: { lang?: string, cookieConsent?: boolean, fontSizeMod?: number }) => {
    const { userSettings, setUserSettings } = context;

    // Passa o valores alterados
    const definedLang: string = newValues.lang || userSettings.lang;
    const definedCookieConsent: boolean = newValues.cookieConsent || userSettings.cookieConsent;
    const definedFontSizeMod: number = newValues.fontSizeMod || userSettings.fontSizeMod;

    // Cria um novo conjunto se configurações
    const newSettings: userSettings = { lang: definedLang, cookieConsent: definedCookieConsent, fontSizeMod: definedFontSizeMod };

    // Salva as atualizações em disco ou RAM
    localStorage.setItem('settings', JSON.stringify(newSettings));
    setUserSettings(newSettings);
}

export const useSettings = () => {
    const context = React.useContext(SettingsContext);
    
    if (context === undefined)
        throw new Error('useCount must be used within a CountProvider')
    
    return context as initializedSettings;
}