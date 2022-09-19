import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { storeData, removeData } from '../services/StorageService';
import { Auth, Lang, Onboarding } from './types';

const LangContext = createContext<Lang>({
    lang: '',
    handleSetLang: () => { }
});

const OnboardingContext = createContext<Onboarding>({
    isOnboard: false,
    handleOnBoarding: () => { }
});

const AuthContext = createContext<Auth>({
    isAuthorized: false,
    handleSignIn: () => { },
    handleSignOut: () => { },
    user: undefined,
    handleSetUser: () => { }
})


export const useLang = () => {
    return useContext(LangContext);
};

export const useOnboarding = () => {
    return useContext(OnboardingContext);
};

export const useAuth = () => {
    return useContext(AuthContext)
}



export const ContextProvider = ({ children }: any) => {
    const {i18n} = useTranslation()
    const [lang, setLang] = useState('');
    const [isOnboard, setIsOnboard] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [user, setUser] = useState(undefined)

    const handleSetLang = (lang: string) => {
        storeData("lang", lang)
        setLang(lang);
    };

    const handleOnBoarding = (val: boolean) => {
        setIsOnboard(val);
    };

    const handleSignIn = (value: boolean) => {
        setIsAuthorized(value);
    };

    const handleSetUser = ( data: any) => {
        setUser(data);
    };

    const handleSignOut = () => {
        removeData('access_token').then(res => {
            setIsAuthorized(false);
        });
    };

    const LangCtx = {
        lang,
        handleSetLang
    };

    const OnboardingCtx = {
        isOnboard,
        handleOnBoarding
    };

    const AuthCtx = {
        user,
        isAuthorized,
        handleSignIn,
        handleSignOut,
        handleSetUser
    }

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])

    return (
        <LangContext.Provider value={LangCtx}>
            <OnboardingContext.Provider value={OnboardingCtx}>
                <AuthContext.Provider value={AuthCtx}>
                    {children}
                </AuthContext.Provider>
            </OnboardingContext.Provider>
        </LangContext.Provider>
    )
}