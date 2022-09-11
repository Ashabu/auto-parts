import React, { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../services/StorageService";
import { Lang, Onboarding, CartItems } from './types';

const LangContext = createContext<Lang>({
    lang: '',
    handleSetLang: () => { }
});
const OnboardingContext = createContext<Onboarding>({
    isOnboard: false,
    handleOnBoarding: () => { }
});
const CartItemsContext = createContext<CartItems>({
    cartItems: [],
    handleAddItem: () => { }
});


export const useLang = () => {
    return useContext(LangContext);
};

export const useOnboarding = () => {
    return useContext(OnboardingContext);
};

export const useCart = () => {
    return useContext(CartItemsContext);
};

export const ContextProvider = ({ children }: any) => {
    const [lang, setLang] = useState('');
    const [isOnboard, setIsOnboard] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<any[]>([]);

    const handleSetLang = (lang: string) => {
        setLang(lang);
    };

    const handleOnBoarding = (val: boolean) => {
        setIsOnboard(val);
    };

    const handleAddItem = () => {
        setCartItems([])
    }

    useEffect(() => {

    }, []);


    const LangCtx = {
        lang,
        handleSetLang
    };
    const OnboardingCtx = {
        isOnboard,
        handleOnBoarding
    };

    const CartItemCtx = {
        cartItems,
        handleAddItem
    }

    return (
        <LangContext.Provider value={LangCtx}>
            <OnboardingContext.Provider value={OnboardingCtx}>
                <CartItemsContext.Provider value={CartItemCtx}>
                    {children}
                </CartItemsContext.Provider>
            </OnboardingContext.Provider>
        </LangContext.Provider>
    )
}