import React, { createContext, useContext, useState } from "react";
import { Lang, Onboarding } from './types';

const LangContext = createContext<Lang>({ lang: '', handleSetLang: () => { } });
const OnboardingContext = createContext<Onboarding>({ isOnboard: false, handleOnBoarding: () => { } })
export const useLang = () => {
    return useContext(LangContext);
};export const useOnboarding = () => {
    return useContext(OnboardingContext);
};

export const ContextProvider = ({ children }: any) => {
    const [lang, setLang] = useState('');
    const [isOnboard, setIsOnboard] = useState<boolean>(false)

    const handleSetLang = (lang: string) => {
        setLang(lang);
    };

    const handleOnBoarding = (val: boolean) => {
        setIsOnboard(val);
    };

    const LangCtx = {
        lang,
        handleSetLang
    }
    const OnboardingCtx = {
        isOnboard,
        handleOnBoarding
    }

    return (
        <LangContext.Provider value={LangCtx}>
            <OnboardingContext.Provider value={OnboardingCtx}>
                {children}
            </OnboardingContext.Provider>
        </LangContext.Provider>
    )
}