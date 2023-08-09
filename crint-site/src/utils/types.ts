interface languageDictionary {
    header? : {
        mobilidade? : {
            titulo? : string,
            aluno? : string,
            professor? : string,
            servidor? : string,
        },

        estrangeiros? : {
            titulo? : string,
            guias? : string,
        },

        informacoes? : {
            titulo? : string,
            convenios? : string,
            dia? : string,
            pesquisa? : string,
        },
    },

    pages : {
        mobilidade : {
            titulo : string,
        
            subpaginas : {
                alunos : {
                    titulo : string,
                },

                professor : {
                    titulo : string,
                },
                
                servidor : {
                    titulo : string,
                },
            },
        },
    
        estrangeiros : {
            titulo : string,
        
            subpaginas : {
                guias : {
                    titulo : string,
                },
            },
        },
    
        informacoes : {
            titulo : string,
        
            subpaginas : {
                convenios : {
                    titulo : string,
                },

                dia : {
                    titulo : string,
                },
                
                pesquisa : {
                    titulo : string,
                },
            },
        },
    },
}

interface userConfig {
    lang? : string,
    fontSizeMod? : Number,
    contrast : boolean,
}