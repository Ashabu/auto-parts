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
    totalCost: number | string,
    totalItems: number
}