interface Map {
    [key: string]: any | undefined
}

const cache: Map = {}

export const readCache = (cachePosition: string) => {
    return cache[cachePosition];
}

export const setCache = (cachePosition: string, value: any) => {
    cache[cachePosition] = value;
}