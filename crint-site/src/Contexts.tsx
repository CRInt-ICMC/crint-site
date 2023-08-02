import React, { useContext } from 'react';
import pt_dict from './dictionary/pt.json';

export interface LangDictState {
    langDictState? : languageDictionary,
    setLangDictState? : (langDict : languageDictionary) => void
}

export const STD_LANGUAGE_STATE : languageDictionary = pt_dict;
export const STD_LANGUAGE_DICTIONARY : languageDictionary = {};

export const LangDictContext = React.createContext(STD_LANGUAGE_DICTIONARY);
export const setLangDict = () => useContext(LangDictContext);