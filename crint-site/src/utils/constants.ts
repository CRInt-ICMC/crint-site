// Language System
export const DEFAULT_LANGUAGE = 'pt';

// Strapi
export const STRAPI_URL = 'https://crint.icmc.usp.br/strapi';
export const STRAPI_API_TOKEN = 'bearer ' + import.meta.env.VITE_STRAPI_API_TOKEN;
// export const STRAPI_API_TOKEN = 'bearer ';

// Fontsize System
export const MIN_FONTSIZE_MULTIPLIER = 0.8;
export const MAX_FONTSIZE_MULTIPLIER = 1.3;

// Imagens
import notfound_icon from '../img/icones/404-error.png';
import wip_icon from '../img/icones/work-in-progress.png';

export const NOTFOUND_ICON = notfound_icon;
export const WIP_ICON = wip_icon