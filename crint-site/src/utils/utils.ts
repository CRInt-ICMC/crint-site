import React from 'react';
import { SettingsContext } from '../Settings';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, MAX_FONT_MULTIPLIER, MIN_FONT_MULTIPLIER } from './constants';

// Carrega as configurações armazenadas
export const loadSettings = () => {
    const BASE_FONTSIZE = getBaseFontSize();

    // Configurações padrão
    let userSettings: userSettings = { lang: DEFAULT_LANGUAGE, cookieConsent: false, fontSize: BASE_FONTSIZE };

    // Se não encontra uma configuração salva, retorna a padrão
    const savedConfigString: string = localStorage.getItem('settings') || '';

    // Retorna as configurações padrão caso o cookie não seja encontrado
    if (savedConfigString === '')
        return userSettings;

    // Recupera as informações em JSON e passa para a variável que será retornada
    const savedConfig: userSettings = JSON.parse(savedConfigString);


    // Garante que é uma língua válida
    let storedLang = savedConfig.lang
    if (!AVAILABLE_LANGUAGES.includes(storedLang))
        storedLang = DEFAULT_LANGUAGE;

    // Garante que é um tamanho válido
    let storedFontSize = savedConfig.fontSize;
    if (storedFontSize > MAX_FONT_MULTIPLIER * BASE_FONTSIZE)
        storedFontSize = MAX_FONT_MULTIPLIER * BASE_FONTSIZE;
    else if (storedFontSize < MIN_FONT_MULTIPLIER * BASE_FONTSIZE)
        storedFontSize = MIN_FONT_MULTIPLIER * BASE_FONTSIZE;
    else if (isNaN(storedFontSize))
        storedFontSize = BASE_FONTSIZE;

    // Carrega os valores para o contexto
    userSettings.cookieConsent = savedConfig.cookieConsent;
    userSettings.lang = storedLang;
    userSettings.fontSize = storedFontSize;

    return userSettings;
}

// Facilita a atualização do valores de configuração
export const updateUserSettings = (context: initializedSettings, newValues: { lang?: string, cookieConsent?: boolean, fontSize?: number }) => {
    const { userSettings, setUserSettings } = context;

    // Passa o valores originais quando não há alterações
    const definedLang: string = newValues.lang || userSettings.lang;
    const definedCookieConsent: boolean = newValues.cookieConsent || userSettings.cookieConsent;
    const definedFontSize: number = newValues.fontSize || userSettings.fontSize;

    // Cria um novo conjunto se configurações
    const newSettings: userSettings = { lang: definedLang, cookieConsent: definedCookieConsent, fontSize: definedFontSize };

    // Salva as atualizações em disco e sobreescreve o contexto atual
    localStorage.setItem('settings', JSON.stringify(newSettings));
    setUserSettings(newSettings);
}

// Garante que o contexto foi inicializado
export const useSettings = () => {
    const context = React.useContext(SettingsContext);

    if (context === undefined)
        throw new Error('useSettings está fora de contexto')

    return context as initializedSettings;
}

export const getBaseFontSize = () => {
    const windowWidth = window.innerWidth;

    console.log(windowWidth);

    if (windowWidth <= 480)
        return 8;

    else if (windowWidth <= 768)
        return 12;

    else if (windowWidth <= 1366)
        return 15;

    else
        return 20;
}