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