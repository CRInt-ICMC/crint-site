export function mountURL(base : string, params : URLSearchParams) {
    let url = base;

    let first : Boolean = true;
    params.forEach((value, param) => {
        // Verifica se é o primeiro parâmetro e ajusta a formatação
        if (first) {
            url += '?';
            first = false;
        }
 
        else
            url += '&';

        url += `${param}=${value}`;
    })
    
    return url;
}

// newParams : [[parâmetro, valor]]
export function updateParams(currentParams : URLSearchParams, newParams : [string, string][]) {
    // Adiciona o parâmetro se ele não existir, se já existir, atualiza ele
    newParams.forEach((pair) => {
        const param = pair[0];
        const value = pair[1];

        if (currentParams.get(param) === null)
            currentParams.append(param, value);
        else
            currentParams.set(param, value);
    })

    return currentParams;
}

export function loadLanguage(currentLang : string) {
    /* Função de carrega linguagem atual */
    console.log(`Linguagem atual: ${currentLang}`);
}