import {ISignInResponse} from '../Api/types';
export type Lang = {
    lang: string,
    handleSetLang: (val: string) => void
}

export type Onboarding = {
    isOnboard: boolean,
    handleOnBoarding: (val: boolean) => void
}

export type CartItems = {
    cartItems: any[],
    handleAddItem: (val: any) => void
}

export type Products = {
    cartItems: any[],
    handleAddItem: (val: any) => void,
    handleIncrement: (data: any) => void,
    handleDecrement: (data: any) => void,
    handleClearItems: () => void,
    totalCost: number | string,
    totalItems: number
}

export type Auth = {
    user: ISignInResponse["user"] | undefined
    handleSetUser: (data: any) => void,
    isAuthorized: boolean,
    handleSignIn: (val: boolean) => void,
    handleSignOut: () => void,
    
}