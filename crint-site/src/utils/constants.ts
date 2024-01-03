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