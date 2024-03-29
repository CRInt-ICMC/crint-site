// This file is part of CRInt-site.

// CRInt-site is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CRInt-site is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CRInt-site. If not, see <https://www.gnu.org/licenses/>.

import React from 'react';
import { SettingsContext } from '../Settings';
import { DEFAULT_LANGUAGE, MAX_FONTSIZE_MULTIPLIER, MIN_FONTSIZE_MULTIPLIER } from './constants';
import { LoadingContext } from '../Loading';
import { ApiSection } from './types';

// Carrega as configurações armazenadas
export const loadSettings = () => {
    const BASE_FONTSIZE = getBaseFontsize();

    // Configurações padrão
    const userSettings: UserSettings = { lang: DEFAULT_LANGUAGE, cookieConsent: false, fontsize: BASE_FONTSIZE };

    // Se não encontra uma configuração salva, retorna a padrão
    const savedConfigString: string = localStorage.getItem('settings') || '';

    // Retorna as configurações padrão caso o cookie não seja encontrado
    if (savedConfigString === '')
        return userSettings;

    // Recupera as informações em JSON e passa para a variável que será retornada
    const savedConfig: UserSettings = JSON.parse(savedConfigString);

    // Carrega os valores para o contexto garantindo que não sejam nulos e que estejam dentro dos limites
    userSettings.cookieConsent = savedConfig.cookieConsent ?? false;
    userSettings.lang = savedConfig.lang ?? DEFAULT_LANGUAGE;
    userSettings.fontsize = clampFontsize(savedConfig.fontsize)

    return userSettings;
}

// Facilita a atualização do valores de configuração
export const updateUserSettings = (context: InitializedSettings, newValues: { lang?: string, cookieConsent?: boolean, fontSize?: number }) => {
    const { userSettings, setUserSettings } = context;

    // Passa o valores originais quando não há alterações
    const definedLang: string = newValues.lang ?? userSettings.lang;
    const definedCookieConsent: boolean = newValues.cookieConsent ?? userSettings.cookieConsent;
    const definedFontSize: number = newValues.fontSize ?? userSettings.fontsize;

    // Cria um novo conjunto se configurações
    const newSettings: UserSettings = { lang: definedLang, cookieConsent: definedCookieConsent, fontsize: definedFontSize };

    // Salva as atualizações em disco e sobreescreve o contexto atual
    localStorage.setItem('settings', JSON.stringify(newSettings));
    setUserSettings(newSettings);
}

// Garante que o contexto foi inicializado
export const useSettings = () => {
    const context = React.useContext(SettingsContext);

    if (context === undefined)
        throw new Error('useSettings está fora de contexto')

    return context as InitializedSettings;
}

// Garante que o contexto foi inicializado
export const useLoading = () => {
    const context = React.useContext(LoadingContext);

    if (context === undefined)
        throw new Error('useLoading está fora de contexto')

    return context as InitializedLoadingState;
}

export const getBaseFontsize = () => {
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
export const clampFontsize = (fontsize: number) => {
    const BASE_FONTSIZE = getBaseFontsize();

    // Checa se realmente é um número
    if (isNaN(fontsize))
        return BASE_FONTSIZE;

    // Limita superiormente a fonte
    if (fontsize > MAX_FONTSIZE_MULTIPLIER * BASE_FONTSIZE)
        return MAX_FONTSIZE_MULTIPLIER * BASE_FONTSIZE;

    // Limita inferiormente a fonte
    if (fontsize < MIN_FONTSIZE_MULTIPLIER * BASE_FONTSIZE)
        return MIN_FONTSIZE_MULTIPLIER * BASE_FONTSIZE;

    // Retorna a fonte sem alterações
    return fontsize;
}

// Remove acentos e caracteres especiais e deixa tudo em minúsculo
export const normalizeText = (text: string) => {
    return text.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export const cleanText = (text: string) => {
    return normalizeText(text).replace(/[^a-z0-9\.,_-]/gim, "").replace(/\s/g, "").trim();
}

// Formata a data do formato DD/MM/YYYY para o formato YYYY-MM-DD
export const formatDateString = (date: string) => {
    const splitDate = date.split('/');

    const day = splitDate[0];
    const month = splitDate[1];
    const year = splitDate[2];

    return `${year}-${month}-${day}`;
}

// Forma os dados dos links para o sumário
export const getLinks = (sections: ApiSection[]) => {
    const sectionLinks: SectionLink[] = [];

    sections.map((section) => {
        sectionLinks.push({
            name: String(section.attributes.Sumario || section.attributes.Titulo),
            id: sections.indexOf(section) + '-' +  cleanText(String(section.attributes.Titulo)),
        } as SectionLink)
    })

    return sectionLinks;
}