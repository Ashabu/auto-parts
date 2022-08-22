import React, { createContext, useContext, useState } from "react";
import { Lang } from './types';

const LangContext = createContext<Lang>({ lang: '', handleSetLang: () => { } });
export const useLang = () => {
    return useContext(LangContext);
};


export const ContextProvider = ({ children }: any) => {
    const [lang, setLang] = useState('');

    const handleSetLang = (lang: string) => {
        setLang(lang);
    };

    const LangCtx = {
        lang,
        handleSetLang
    }

    return (
        <LangContext.Provider value={LangCtx}>
            {children}
        </LangContext.Provider>
    )
}