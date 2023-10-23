// Language System
export const AVAILABLE_LANGUAGES = ['pt', 'en'];
export const DEFAULT_LANGUAGE = 'pt';

// Strapi
export const STRAPI_URL = 'https://crint.icmc.usp.br/strapi';
export const STRAPI_API_TOKEN = 'bearer ' + import.meta.env.VITE_STRAPI_API_TOKEN;

// Fontsize System
export const BASE_FONTSIZE = 20;
export const MIN_FONT = BASE_FONTSIZE * 0.8;
export const MAX_FONT = BASE_FONTSIZE * 1.3;

// Imagens
import email from '../img/icones/email.png';
import notfound_icon from '../img/icones/404-error.png';
import telefone from '../img/icones/telefone.png';
import wip_icon from '../img/icones/work-in-progress.png';

export const EMAIL = email;
export const NOTFOUND_ICON = notfound_icon;
export const TELEFONE = telefone;
export const WIP_ICON = wip_icon