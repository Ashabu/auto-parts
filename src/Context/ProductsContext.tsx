
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

type ProductsState = {
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
        const onAddProduct = () => {
            let tempArray: ProductsState["shoppingCart"]= [];
            let tempCost:number = 0;
            //let tempCount:number = 0;
            for(let i = 0; i<=productsState.shoppingCart.length; i++) {
                if(productsState.shoppingCart.length == 0) return;
                tempCost += productsState.shoppingCart[i].RetilePRiceOFPremix;
                let index = tempArray.findIndex(el => el.ARticle == productsState.shoppingCart[i].ARticle);
                if(index < 0) {
                    //@ts-ignore
                    tempArray.push(productsState.shoppingCart[i])
                } else {
                    tempArray[index].count ++
                }
            };
            memoizedDispatch({shoppingCart: [...tempArray], totalCost: tempCost})
        }    
        const onCountItems = () => {
            let count: number = 0;
            productsState.shoppingCart.forEach(item => count +=item.count);
            memoizedDispatch({totalItemCount: count}) 
        }
       
        useEffect(() => {
            onAddProduct()
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

