interface Map {
    [key: string]: any | undefined
}

const cache : Map = {}

export function readCache(cachePosition :  string) {
    return cache[cachePosition];
}

export function setCache(cachePosition : string, value : any) {
    cache[cachePosition] = value;
}