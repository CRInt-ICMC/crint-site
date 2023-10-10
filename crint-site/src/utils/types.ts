interface userSettings {
    cookieConsent: boolean,
    lang: string,
    fontSizeMod: number,
}

// Informações da imagem
interface strapiImageFormat {
    name: string,
    caption: string,
    alternativeText: string,

    height: number,
    width: number,
    size: number,

    url: string,
    hash: string,
    
    mime: string,
    ext: string,
}

// Pacote recebido do strapi
interface strapiImageData extends strapiImageFormat {
    formats: {
        large: strapiImageFormat,
        medium: strapiImageFormat,
        small: strapiImageFormat,
        thumbnail: strapiImageFormat,
    }
}

interface sectionLink {
    name: string,
    id: string,
}