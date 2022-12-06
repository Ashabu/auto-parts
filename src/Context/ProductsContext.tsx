
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
    useReducer
} from 'react';

export type ProductsState = {
    shoppingCart: {
        ARticle: number,
        Brand: string,
        Code: number,
        Group: string,
        Name: string,
        OEM: string,
        Prices: string,
        RetilePRiceOFPremix: number,
        UnitOfMeasurement: string,
        Volume: number,
        category: string,
        count: number
    }[] | [],
    wishList: ProductsState["shoppingCart"],
    totalCost: number,
    totalItemCount: number
}

type Dispatch = React.Dispatch<Partial<ProductsState>>;

const initialProductsState: ProductsState = {
    shoppingCart: [],
    wishList: [],
    totalItemCount: 0,
    totalCost: 0
}
const StateContext = createContext<ProductsState>(initialProductsState);

const DispatchContext = createContext<React.Dispatch<Partial<ProductsState>>>(
    () => { }
);


export const ProductsProvider = (
    { children }: { children: ReactNode }) => {
    const [productsState, setProductsState] = useReducer(
        (state: ProductsState, newState: Partial<ProductsState>) => ({
            ...state,
            ...newState,
        }),
        initialProductsState
    );

    const memoizedDispatch = useCallback(
        (value: Partial<ProductsState>) => {
            setProductsState(value);
        }, []);

    const memoizedValue = useMemo(
        () => ({
            ...productsState
        }),
        [productsState]
    );

    const handleCount = useCallback(() => {
        console.log('totalItemCount', productsState.totalItemCount, 'totalCost', productsState.totalCost)
        let tempItemCount: number = 0;
        let tempTotalCost: number = 0;
        if (productsState.shoppingCart.length > 0) {
            productsState.shoppingCart.forEach(p => {
                tempItemCount += p.count;
                tempTotalCost += (p.count * p.RetilePRiceOFPremix);
            });
        };

        setProductsState(prev => {
            return {
                ...prev,
                tempTotalCost: tempTotalCost,
                tempItemCount: tempItemCount
            };
        });
    }, [productsState.shoppingCart, productsState.wishList]);


    useEffect(() => {
        console.log(productsState.shoppingCart)
        handleCount()
       
    }, [productsState.shoppingCart])

    return (
        <StateContext.Provider value={memoizedValue}>
            <DispatchContext.Provider value={memoizedDispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};


export const useProduct = () => useContext(StateContext);
export const useProductDispatch: () => Dispatch = () => useContext(DispatchContext);

