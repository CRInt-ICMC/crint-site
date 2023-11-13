import React from 'react';
import { SettingsContext } from '../Settings';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, MAX_FONT_MULTIPLIER, MIN_FONT_MULTIPLIER } from './constants';
import { LoadingContext } from '../Loading';

// Carrega as configurações armazenadas
export const loadSettings = () => {
    const BASE_FONTSIZE = getBaseFontSize();

    // Configurações padrão
    const userSettings: userSettings = { lang: DEFAULT_LANGUAGE, cookieConsent: false, fontSize: BASE_FONTSIZE };

    // Se não encontra uma configuração salva, retorna a padrão
    const savedConfigString: string = localStorage.getItem('settings') || '';

    // Retorna as configurações padrão caso o cookie não seja encontrado
    if (savedConfigString === '')
        return userSettings;

    // Recupera as informações em JSON e passa para a variável que será retornada
    const savedConfig: userSettings = JSON.parse(savedConfigString);

    // Garante que é uma língua válida
    const storedLang = AVAILABLE_LANGUAGES.includes(savedConfig.lang) ? savedConfig.lang : DEFAULT_LANGUAGE

    // Garante que é um tamanho válido
    const storedFontSize = clampFontSize(savedConfig.fontSize);

    // Carrega os valores para o contexto
    userSettings.cookieConsent = savedConfig.cookieConsent || false;
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

// Garante que o contexto foi inicializado
export const useLoading = () => {
    const context = React.useContext(LoadingContext);

    if (context === undefined)
        throw new Error('useLoading está fora de contexto')

    return context as initializedLoadingState;
}

export const getBaseFontSize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 480)
        return 8;

    else if (windowWidth <= 768)
        return 12;

    else if (windowWidth <= 1366)
        return 15;

    else
        return 20;
}

// Mantém a fonte dentro dos limites
export const clampFontSize = (fontsize: number) => {
    const BASE_FONTSIZE = getBaseFontSize();

    // Checa se realmente é um número
    if (isNaN(fontsize))
        return BASE_FONTSIZE;

    // Limita superiormente a fonte
    if (fontsize > MAX_FONT_MULTIPLIER * BASE_FONTSIZE)
        return MAX_FONT_MULTIPLIER * BASE_FONTSIZE;

    // Limita inferiormente a fonte
    if (fontsize < MIN_FONT_MULTIPLIER * BASE_FONTSIZE)
        return MIN_FONT_MULTIPLIER * BASE_FONTSIZE;

    // Retorna a fonte sem alterações
    return fontsize;
}